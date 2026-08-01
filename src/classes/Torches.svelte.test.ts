import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Torches } from './Torches.svelte';
import Torch from './Torch.svelte';
import AMBIENCE from './Ambience.svelte';

describe('Torches', () => {
	let torches: Torches;

	beforeEach(() => {
		torches = new Torches();
	});

	it('addTorch stores the torch and lights it when requested', () => {
		const a = new Torch();
		torches.addTorch(a, true);
		expect(Object.keys(torches.torches)).toHaveLength(1);
		expect(torches.torches[a.id].isLit).toBe(true);

		const b = new Torch();
		torches.addTorch(b, false);
		expect(torches.torches[b.id].isLit).toBe(false);
	});

	it('deleteTorch removes the torch from the record', () => {
		const a = new Torch();
		torches.addTorch(a, false);
		torches.deleteTorch(a.id);
		expect(Object.keys(torches.torches)).toHaveLength(0);
		expect(torches.torches[a.id]).toBeUndefined();
	});

	it('getExpired returns lit torches whose remaining time hits 0', () => {
		const a = new Torch();
		a.timeLeft = 10;
		torches.addTorch(a, true); // lit, startTime = 0
		expect(torches.getExpired(9)).toEqual([]);
		expect(torches.getExpired(10)).toContain(a.id);
	});

	it('getExpired also flags unlit torches left at 0 (defensive)', () => {
		const a = new Torch();
		a.timeLeft = 0;
		torches.addTorch(a, false); // unlit, timeLeft 0
		expect(torches.getExpired(0)).toContain(a.id);
	});

	it('getExpired ignores torches that still have time', () => {
		const a = new Torch();
		a.timeLeft = 50;
		torches.addTorch(a, true); // lit, remaining 50
		const b = new Torch();
		b.timeLeft = 50;
		torches.addTorch(b, false); // unlit, timeLeft 50 > 0
		expect(torches.getExpired(0)).toEqual([]);
	});

	it('cleanUpTorches deletes the expired ids', () => {
		const a = new Torch();
		a.timeLeft = 10;
		torches.addTorch(a, true);
		torches.cleanUpTorches([a.id], 10);
		expect(torches.torches[a.id]).toBeUndefined();
	});

	it('cleanUpTorches plays the blowout sound once per batch', () => {
		const play = vi.fn();
		const pause = vi.fn();
		AMBIENCE.blowout = { play } as any;
		AMBIENCE.fire = { pause } as any;

		const ids: string[] = [];
		for (let i = 0; i < 3; i++) {
			const torch = new Torch();
			torch.timeLeft = 5;
			torches.addTorch(torch, true);
			ids.push(torch.id);
		}
		torches.cleanUpTorches(ids, 5);
		expect(play).toHaveBeenCalledTimes(1);
		expect(pause).toHaveBeenCalledTimes(1);
	});

	it('decrementRound subtracts 600s from lit torches only', () => {
		const a = new Torch();
		a.timeLeft = 3600;
		torches.addTorch(a, true);
		const b = new Torch();
		b.timeLeft = 3600;
		torches.addTorch(b, false);
		torches.decrementRound();
		expect(torches.torches[a.id].timeLeft).toBe(3000);
		expect(torches.torches[b.id].timeLeft).toBe(3600);
	});

	it('decrementRound removes torches that drop to 0 or below', () => {
		const a = new Torch();
		a.timeLeft = 300;
		torches.addTorch(a, true); // 300 - 600 = -300
		torches.decrementRound();
		expect(torches.torches[a.id]).toBeUndefined();
	});

	it('sortByTimeLeft orders torches ascending by time left', () => {
		const a = new Torch();
		a.timeLeft = 600;
		const b = new Torch();
		b.timeLeft = 100;
		const c = new Torch();
		c.timeLeft = 300;
		torches.addTorch(a, false);
		torches.addTorch(b, false);
		torches.addTorch(c, false);
		torches.sortByTimeLeft();
		expect(Object.keys(torches.torches)).toEqual([b.id, c.id, a.id]);
	});

	it('pauseAllTorches pauses only lit torches and preserves remaining time', () => {
		const a = new Torch();
		a.timeLeft = 100;
		torches.addTorch(a, true); // lit, startTime = 0
		const b = new Torch();
		b.timeLeft = 100;
		torches.addTorch(b, false);
		torches.pauseAllTorches(20);
		expect(torches.torches[a.id].isLit).toBe(false);
		expect(torches.torches[a.id].timeLeft).toBe(80); // 100 - (20 - 0)
		expect(torches.torches[b.id].isLit).toBe(false);
		expect(torches.torches[b.id].timeLeft).toBe(100); // untouched
	});
});
