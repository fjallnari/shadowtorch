import { writable, type Writable } from 'svelte/store';

export const ambientMode: Writable<boolean> = writable(true);
