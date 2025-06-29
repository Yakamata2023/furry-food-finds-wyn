
// Firebase configuration for WYN Remnants mobile app
// These values should be populated in mobile/.env

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key-here",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "your-app-id"
};

export default firebaseConfig;
