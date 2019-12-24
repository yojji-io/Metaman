import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';
import * as app from 'firebase/app';
import { initializeApp, analytics } from 'firebase/app';

export function firebase(firebaseConfig) {
  // Initialize Firebase
  initializeApp(firebaseConfig);
  analytics();

  return app;
}
