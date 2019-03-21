import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

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
const firebasePromotion = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
  firebase,
  firebaseMatches,
  firebasePromotion,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
};
