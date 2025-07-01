
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wynremnants.mobile',
  appName: 'WYN Remnants',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://07269387-7742-48b7-a275-89304afa51f2.lovableproject.com?forceHideBadge=true',
    cleartext: true
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
