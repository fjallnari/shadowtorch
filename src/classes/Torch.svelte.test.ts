import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Torch from './Torch.svelte';
import { timer } from './Timer.svelte';

describe('Torch', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		if (timer.isRunning) timer.stop();
		timer.reset();
		timer.start();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('constructs with sensible defaults', () => {
		const torch = new Torch();
		expect(torch.timeLeft).toBe(3600);
		expect(torch.isLit).toBe(false);
		expect(torch.id).toHaveLength(10);
	});

	it('lightUp marks lit and rounds startTime to whole seconds (drift fix)', () => {
		vi.advanceTimersByTime(2500); // timer.getTime() = 2500ms = 2.5s
		const torch = new Torch();
		torch.lightUp();
		expect(torch.isLit).toBe(true);
		expect(Number.isInteger(torch.startTime)).toBe(true);
		expect(torch.startTime).toBe(3); // Math.round(2.5)
	});

	it('pause bakes elapsed into timeLeft and un-lits', () => {
		const torch = new Torch();
		torch.timeLeft = 100;
		torch.lightUp(); // startTime = round(0/1000) = 0
		vi.advanceTimersByTime(10_000); // 10s elapsed
		torch.pause(10); // currentTime in seconds
		expect(torch.isLit).toBe(false);
		expect(torch.timeLeft).toBe(90); // 100 - (10 - 0)
	});

	it('extinguish zeroes timeLeft and un-lits', () => {
		const torch = new Torch();
		torch.lightUp();
		torch.extinguish();
		expect(torch.isLit).toBe(false);
		expect(torch.timeLeft).toBe(0);
	});

	it('switch toggles between lit and paused', () => {
		const torch = new Torch();
		torch.timeLeft = 100;
		torch.switch(0); // -> lit
		expect(torch.isLit).toBe(true);
		torch.switch(5); // -> pause: timeLeft = 100 - (5 - startTime)
		expect(torch.isLit).toBe(false);
		expect(torch.timeLeft).toBeLessThan(100);
	});

	it('prettyTime formats MM:SS for unlit and lit torches', () => {
		const torch = new Torch();
		torch.timeLeft = 65; // 1:05
		expect(torch.prettyTime(0)).toBe('01:05'); // unlit -> timeLeft

		torch.timeLeft = 3600;
		torch.lightUp(); // startTime = 0
		expect(torch.prettyTime(0)).toBe('60:00'); // 3600 - (0 - 0)
	});
});
