const DEFAULT_MAX_SECONDS = 3600; // 60 minutes
const BLITZ_MAX_SECONDS = 1800; // 30 minutes

class TorchSettings {
	public blitzMode: boolean = $state(false);
	public hideCountdown: boolean = $state(false);

	public get maxSeconds() {
		return this.blitzMode ? BLITZ_MAX_SECONDS : DEFAULT_MAX_SECONDS;
	}
}

const TORCH_SETTINGS = $state(new TorchSettings());
export default TORCH_SETTINGS;
