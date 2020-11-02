import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpM1fGc8PLLfhJVv_08Gx3OTQn8WD_9qw",
  authDomain: "discord-clone-redux-firebase.firebaseapp.com",
  databaseURL: "https://discord-clone-redux-firebase.firebaseio.com",
  projectId: "discord-clone-redux-firebase",
  storageBucket: "discord-clone-redux-firebase.appspot.com",
  messagingSenderId: "536604837673",
  appId: "1:536604837673:web:51a240e148af5990d7d938",
  measurementId: "G-H2SVF54T5L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
