import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lindsor.capacitordemo',
  appName: 'capacitor-demo',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },

  plugins: {
    LiveUpdates: {
      appId: '948760ef',
      channel: 'Production',
      autoUpdateMethod: 'background',
      // Number of retroactive cached versions to rollback
      maxVersions: 2,
    },
  },
};

export default config;
