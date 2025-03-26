import { writable, type Writable } from 'svelte/store';

export const activeView: Writable<string> = writable('ambient');
export const colorTheme: Writable<string> = writable('default');
