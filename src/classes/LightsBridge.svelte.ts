import LIGHTS from './Lights.svelte';
import { t } from './Torches.svelte';
import { colorTheme, currentTime } from '../stores';
import { THEMES } from '../util/themes';
import { hexToRgb } from '../util/util';

/**
 * Smart-light bridge (self-host proxy). Color/brightness dynamically track
 * the theme/longest-torch remaining time (the room only goes fully dark once
 * the last torch burns out); turn off on darkness. Bucketed so HA isn't hit
 * per tick.
 */

let themeId = $state('default');
colorTheme.subscribe((v) => (themeId = v));

let now = $state(0);
currentTime.subscribe((v) => (now = v));

const DIM_THRESHOLD = 600; // seconds — start dimming in the last 10 minutes
const DIM_FLOOR = 25; // brightness % floor reached at DIM_THRESHOLD, before the final countdown
const FINAL_COUNTDOWN = 30; // seconds — count down from DIM_FLOOR to 0, ticking every second
const brightnessBucket = (remaining: number) => {
	if (remaining >= DIM_THRESHOLD) return 100;
	if (remaining <= FINAL_COUNTDOWN) {
		return Math.round((remaining / FINAL_COUNTDOWN) * DIM_FLOOR);
	}
	// ramp 100 -> DIM_FLOOR over the dimming window, bucketed in steps of 5 so HA isn't hit per tick
	const span = DIM_THRESHOLD - FINAL_COUNTDOWN;
	const pct = DIM_FLOOR + ((remaining - FINAL_COUNTDOWN) / span) * (100 - DIM_FLOOR);
	return Math.max(DIM_FLOOR, Math.round(pct / 5) * 5);
};

let prevLit = 0;
let prevBucket = -1;
let prevThemeId: string | null = null;

$effect.root(() => {
	$effect(() => {
		const torches = t.torches;
		const litIds = Object.keys(torches).filter((id) => torches[id].isLit);

		if (!LIGHTS.enabled) {
			prevLit = litIds.length;
			return;
		}
		const currLit = litIds.length;
		if (currLit === 0 && prevLit > 0) {
			LIGHTS.turnOff();
			prevBucket = -1;
			prevThemeId = null;
		} else if (currLit > 0) {
			const theme = THEMES.find((th) => th.id === themeId) ?? THEMES[0];
			const remainingOf = (id: string) => torches[id].timeLeft - (now - torches[id].startTime);
			const longestId = litIds.reduce((prev, curr) =>
				remainingOf(prev) > remainingOf(curr) ? prev : curr
			);
			const remaining = remainingOf(longestId);
			const bucket = brightnessBucket(Math.max(0, remaining));
			if (prevLit === 0 || bucket !== prevBucket || themeId !== prevThemeId) {
				LIGHTS.turnOn(bucket, hexToRgb(theme['--clr-accent-300']));
				prevBucket = bucket;
				prevThemeId = themeId;
			}
		}
		prevLit = currLit;
	});
});
