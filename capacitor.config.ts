import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.shadowtorch',
	appName: 'Shadowtorch',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
