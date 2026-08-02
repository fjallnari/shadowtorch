import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LIGHTS from './Lights.svelte';

describe('Lights', () => {
	let fetchSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }));
		LIGHTS.enabled = false;
	});

	afterEach(() => fetchSpy.mockRestore());

	it('does nothing when disabled', async () => {
		await LIGHTS.turnOn(100);
		await LIGHTS.turnOff();
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	describe('enabled (proxy)', () => {
		beforeEach(() => {
			LIGHTS.enabled = true;
		});

		it('turnOn POSTs same-origin with brightness + rgb, no auth header', async () => {
			await LIGHTS.turnOn(60, [10, 20, 30]);
			const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('/api/lights/turn_on');
			expect(init.method).toBe('POST');
			expect((init.headers as Record<string, string>).Authorization).toBeUndefined();
			expect(JSON.parse(init.body as string)).toEqual({
				brightness_pct: 60,
				rgb_color: [10, 20, 30]
			});
		});

		it('turnOn with no args sends an empty body', async () => {
			await LIGHTS.turnOn();
			const [, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
			expect(JSON.parse(init.body as string)).toEqual({});
		});

		it('turnOff POSTs to /api/lights/turn_off', async () => {
			await LIGHTS.turnOff();
			const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
			expect(url).toBe('/api/lights/turn_off');
			expect(JSON.parse(init.body as string)).toEqual({});
		});
	});
});
