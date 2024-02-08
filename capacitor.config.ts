import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.vercel.shadowtorch',
	appName: 'shadowtorch',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
