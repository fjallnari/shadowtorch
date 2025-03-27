import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.shadowtorch',
	appName: 'Shadowtorch',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	},
	plugins: {
		EdgeToEdge: {
			backgroundColor: "#1c1917"
		}
	}
};

export default config;
