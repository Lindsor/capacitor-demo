import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lindsor.capacitordemo',
  appName: 'capacitor-demo',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
