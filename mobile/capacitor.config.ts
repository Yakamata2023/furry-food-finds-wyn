
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wynremnants.mobile',
  appName: 'WYN Remnants',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'your-google-client-id-here.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
