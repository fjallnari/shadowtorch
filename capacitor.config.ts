import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'shadowtorch',
	appName: 'Shadowtorch',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
