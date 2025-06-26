// Firebase configuration for WYN Remnants mobile app
// These values will be populated by scripts/setup_firebase.ps1 into mobile/.env
// and injected at build time via Expo's env system (app.config.js or eas).

export default {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // Storage and messaging optional for now
};
