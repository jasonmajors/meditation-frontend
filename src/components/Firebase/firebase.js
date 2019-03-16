import firebase from "firebase";
// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// const firebase = require("firebase");
require("firebase/firestore");


var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.db = firebase.firestore();
  }
}

export default Firebase;
