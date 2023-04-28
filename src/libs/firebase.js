import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: "AIzaSyD1skzQiHoWQe1DXBJCIFG7xvsSRfcVSiI",
  // authDomain: "order-food-11734.firebaseapp.com",
  // projectId: "order-food-11734",
  // storageBucket: "order-food-11734.appspot.com",
  // messagingSenderId: "72958997759",
  // appId: "1:72958997759:web:ef1597926a0b4b935e88ca",
  // measurementId: "G-C31MM2PF01"

  // apiKey: "AIzaSyC7pibcj7fGn6iHxvC-2ePTy813LeaYHDc",
  // authDomain: "test-ndt.firebaseapp.com",
  // databaseURL: "https://test-ndt-default-rtdb.firebaseio.com",
  // projectId: "test-ndt",
  // storageBucket: "test-ndt.appspot.com",
  // messagingSenderId: "565054345080",
  // appId: "1:565054345080:web:95bd0c94a4999d1eab428d",
  // measurementId: "G-PPEZ6WP8RX"

  apiKey: "AIzaSyBeJMOwUUWKcEnZgMF4b9qUppEYBWBVn6A",
  authDomain: "otp-project-184ad.firebaseapp.com",
  projectId: "otp-project-184ad",
  storageBucket: "otp-project-184ad.appspot.com",
  messagingSenderId: "485878348538",
  appId: "1:485878348538:web:0cb3b08fe4111b33d3a743",
  measurementId: "G-RXR4MPS4K2"

  // apiKey: 'AIzaSyAaxzrVfKNq7xlaosxDyaSdU_OpGNn-wok',
  // authDomain: 'trustkeys-network.firebaseapp.com',
  // projectId: 'trustkeys-network',
  // storageBucket: 'trustkeys-network.appspot.com',
  // messagingSenderId: '868140955525',
  // appId: '1:868140955525:web:bbcc38c6d389dc067376ec',
  // measurementId: 'G-R9V903SRST'
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
auth.useDeviceLanguage();
// auth.settings.appVerificationDisabledForTesting = true;

export default {
  appFirebase, auth, RecaptchaVerifier, signInWithPhoneNumber
}
