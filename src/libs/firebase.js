import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBeJMOwUUWKcEnZgMF4b9qUppEYBWBVn6A",
//   authDomain: "otp-project-184ad.firebaseapp.com",
//   projectId: "otp-project-184ad",
//   storageBucket: "otp-project-184ad.appspot.com",
//   messagingSenderId: "485878348538",
//   appId: "1:485878348538:web:0cb3b08fe4111b33d3a743",
//   measurementId: "G-RXR4MPS4K2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD1skzQiHoWQe1DXBJCIFG7xvsSRfcVSiI",
  authDomain: "order-food-11734.firebaseapp.com",
  projectId: "order-food-11734",
  storageBucket: "order-food-11734.appspot.com",
  messagingSenderId: "72958997759",
  appId: "1:72958997759:web:ef1597926a0b4b935e88ca",
  measurementId: "G-C31MM2PF01"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDwx1k4uQOz70I2XY7kzq2rOzvstbj-Eao",
//   authDomain: "test-otp-a78a2.firebaseapp.com",
//   projectId: "test-otp-a78a2",
//   storageBucket: "test-otp-a78a2.appspot.com",
//   messagingSenderId: "658040531380",
//   appId: "1:658040531380:web:9f311baf033039f860aae1",
//   measurementId: "G-EX7KQNMKWJ"
// };


const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
// auth.useDeviceLanguage();
// auth.settings.appVerificationDisabledForTesting = true;

export default {
  appFirebase, auth, RecaptchaVerifier, signInWithPhoneNumber
}
