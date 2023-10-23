import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCjnmRXpFwdp7e3IKrabfrLll7z_I1Whbc",
  authDomain: "pulso-democratico.firebaseapp.com",
  projectId: "pulso-democratico",
  storageBucket: "pulso-democratico.appspot.com",
  messagingSenderId: "541429850200",
  appId: "1:541429850200:web:98d5925b016e34e8ed6a2d"
};

export const app = initializeApp(firebaseConfig);