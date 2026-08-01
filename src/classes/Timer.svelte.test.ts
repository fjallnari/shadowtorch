import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { timer } from './Timer.svelte';

describe('Timer', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		if (timer.isRunning) timer.stop();
		timer.reset();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('getTime returns 0 before start', () => {
		expect(timer.getTime()).toBe(0);
	});

	it('start makes getTime advance with elapsed time', () => {
		timer.start();
		vi.advanceTimersByTime(1500);
		expect(timer.getTime()).toBe(1500);
	});

	it('stop freezes the accumulated time', () => {
		timer.start();
		vi.advanceTimersByTime(1000);
		timer.stop();
		expect(timer.getTime()).toBe(1000);
		vi.advanceTimersByTime(2000);
		expect(timer.getTime()).toBe(1000);
	});

	it('reset zeroes accumulated time', () => {
		timer.start();
		vi.advanceTimersByTime(2000);
		timer.stop();
		timer.reset();
		expect(timer.getTime()).toBe(0);
	});
});
