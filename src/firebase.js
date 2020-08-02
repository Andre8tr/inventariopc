import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBawJBBt6uQ9MudbNynjdKslWfKi2rWviM",
    authDomain: "inventario-a777c.firebaseapp.com",
    databaseURL: "https://inventario-a777c.firebaseio.com",
    projectId: "inventario-a777c",
    storageBucket: "inventario-a777c.appspot.com",
    messagingSenderId: "1009750889140",
    appId: "1:1009750889140:web:c3ecfccfa145ee9109fde1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export { firebase }
