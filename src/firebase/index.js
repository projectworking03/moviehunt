import firebase from "firebase";

// Define the configuration as provided in the Project Settings of the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBfmOcmkUmvqf8PzJOoAFrf8DArUr0hKZM",
  authDomain: "moviehuntamity.firebaseapp.com",
  projectId: "moviehuntamity",
  storageBucket: "moviehuntamity.appspot.com",
  messagingSenderId: "1032540081407",
  appId: "1:1032540081407:web:172fd6fc5b2f88c87ed0ca",
  // eslint-disable-next-line
  measurementId: "${config.measurementId}",
};

// Initialize the app
const app = firebase.initializeApp(firebaseConfig);

// Extract the services that you want
export const db = app.firestore();
// export const auth = firebase.auth()
