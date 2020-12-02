import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxgV35ELV0QdUaZp27jQgxxkBje9HZOCw",
  authDomain: "endangerment.firebaseapp.com",
  databaseURL: "https://endangerment.firebaseio.com",
  projectId: "endangerment",
  storageBucket: "endangerment.appspot.com",
  messagingSenderId: "209405275069",
  appId: "1:209405275069:web:e668f60177aedb5a1280d4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;