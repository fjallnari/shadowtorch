import { writable, type Writable } from 'svelte/store';

export const activeView: Writable<string> = writable('ambient');
export const blowoutSoundEnabled: Writable<boolean> = writable(true);
export const ambienceSoundEnabled: Writable<boolean> = writable(true);
export const colorTheme: Writable<string> = writable('default');
