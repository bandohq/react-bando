import { initializeApp } from 'firebase/app';

const apiKey = process.env.FIREBASE_API_KEY ?? '';
const authDomain = process.env.FIREBASE_AUTH_DOMAIN ?? '';
const projectId = process.env.FIREBASE_PROJECT_ID ?? '';
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET ?? '';
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID ?? '';
const appId = process.env.FIREBASE_APP_ID ?? '';
const measurementId = process.env.FIREBASE_MEASUREMENT_ID ?? '';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

export default function initFirebase() {
  initializeApp(firebaseConfig);
}
