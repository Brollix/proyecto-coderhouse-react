// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB9j4aH7m6lDGd-BUG3GTLIIdwDnpU9IDk',
	authDomain: 'proyecto-coderhouse-reac-9fb39.firebaseapp.com',
	projectId: 'proyecto-coderhouse-reac-9fb39',
	storageBucket: 'proyecto-coderhouse-reac-9fb39.appspot.com',
	messagingSenderId: '572163278427',
	appId: '1:572163278427:web:95e0bf7a7ba1e6eb23a17e',
	measurementId: 'G-TCD1NH6KH1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
