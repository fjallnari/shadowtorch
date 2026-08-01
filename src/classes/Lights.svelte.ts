/**
 * Smart-light integration, enabled by the LIGHTS_ENABLED env var. 
 * The app's own server proxies to Home Assistant using HA_BASE_URL /
 * HA_TOKEN / HA_ENTITY_IDS (see routes/api/lights), so the token stays
 * server-side and the browser calls same-origin /api/lights/<service>.
 */
class Lights {
	public enabled: boolean = $state(import.meta.env.LIGHTS_ENABLED ?? false);

	public turnOn = (brightness_pct?: number, rgb?: [number, number, number]) => {
		if (!this.enabled) return;
		const data: Record<string, unknown> = {};
		if (brightness_pct !== undefined) data.brightness_pct = brightness_pct;
		if (rgb) data.rgb_color = rgb;
		this.proxy('turn_on', data);
	};

	public turnOff = () => {
		if (!this.enabled) return;
		this.proxy('turn_off', {});
	};

	private proxy = async (service: string, data: object) => {
		try {
			await fetch(`/api/lights/${service}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
		} catch (e) {
			console.warn('lights proxy call failed', e);
		}
	};
}

const LIGHTS = $state(new Lights());
export default LIGHTS;
