import { KeepAwake } from '@capacitor-community/keep-awake';
import { t } from './Torches.svelte';

/**
 * Keeps the screen on while any torch is lit; releases the lock once the last
 * one goes out. Works natively and in browsers with the Screen Wake Lock API;
 * no-op elsewhere. Only calls the plugin on transitions, not per tick.
 */

let prevLit = false;

$effect.root(() => {
	$effect(() => {
		const torches = t.torches;
		const anyLit = Object.keys(torches).some((id) => torches[id].isLit);

		if (anyLit === prevLit) {
			return;
		}
		prevLit = anyLit;

		KeepAwake.isSupported()
			.then(({ isSupported }) => {
				if (!isSupported) {
					return;
				}
				return anyLit ? KeepAwake.keepAwake() : KeepAwake.allowSleep();
			})
			.catch((e) => console.error('KeepAwake failed', e));
	});
});
