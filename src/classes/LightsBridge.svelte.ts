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
const brightnessBucket = (remaining: number) => {
	if (remaining >= DIM_THRESHOLD) return 100;
	const b = Math.round(((remaining / DIM_THRESHOLD) * 100) / 10) * 10;
	return Math.max(10, Math.min(100, b));
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
			const longestId = litIds.reduce((prev, curr) =>
				torches[prev].timeLeft > torches[curr].timeLeft ? prev : curr
			);
			const torch = torches[longestId];
			const remaining = torch.timeLeft - (now - torch.startTime);
			const bucket = brightnessBucket(Math.max(0, remaining));
			if (prevLit === 0 || bucket !== prevBucket || themeId !== prevThemeId) {
				LIGHTS.turnOn(bucket, hexToRgb(theme['--clr-accent-500']));
				prevBucket = bucket;
				prevThemeId = themeId;
			}
		}
		prevLit = currLit;
	});
});
