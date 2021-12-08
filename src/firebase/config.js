// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA-fDRGxu8kyuBrECwu2t0t-3jWtlie9dI',
	authDomain: 'curso-react-d5967.firebaseapp.com',
	projectId: 'curso-react-d5967',
	storageBucket: 'curso-react-d5967.appspot.com',
	messagingSenderId: '384736135801',
	appId: '1:384736135801:web:6b5ba4bcb3fbfa6917e2a8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
