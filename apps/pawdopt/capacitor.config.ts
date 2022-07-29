import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cloud5.pawdopt',
  appName: 'pawdopt',
  webDir: '../../dist/apps/pawdopt',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  }
};

//! REMEMBER TO REMOVE CLEARTEXT WHEN READY FOR PRODUCTION

export default config;
