import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBkm9NAumILNA2V_W0BbSFfepWkOKMTmy0',
  authDomain: 'm-city-4be0a.firebaseapp.com',
  databaseURL: 'https://m-city-4be0a.firebaseio.com',
  projectId: 'm-city-4be0a',
  storageBucket: 'm-city-4be0a.appspot.com',
  messagingSenderId: '276189216264'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export { firebase, firebaseMatches };