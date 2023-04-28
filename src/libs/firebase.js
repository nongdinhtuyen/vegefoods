import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeJMOwUUWKcEnZgMF4b9qUppEYBWBVn6A",
  authDomain: "otp-project-184ad.firebaseapp.com",
  projectId: "otp-project-184ad",
  storageBucket: "otp-project-184ad.appspot.com",
  messagingSenderId: "485878348538",
  appId: "1:485878348538:web:0cb3b08fe4111b33d3a743",
  measurementId: "G-RXR4MPS4K2"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
auth.useDeviceLanguage();
// auth.settings.appVerificationDisabledForTesting = true;

export default {
  appFirebase, auth, RecaptchaVerifier, signInWithPhoneNumber
}
