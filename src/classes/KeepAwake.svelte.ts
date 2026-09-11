import { KeepAwake } from '@capacitor-community/keep-awake';
import { Capacitor } from '@capacitor/core';
import { t } from './Torches.svelte';

/**
 * Keeps the screen on while any torch is lit; releases the lock once the last
 * one goes out. No-op on web. Only calls the plugin on transitions, not per tick.
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

		if (!Capacitor.isNativePlatform()) {
			return;
		}

		const call = anyLit ? KeepAwake.keepAwake() : KeepAwake.allowSleep();
		call.catch((e) => console.error('KeepAwake failed', e));
	});
});
