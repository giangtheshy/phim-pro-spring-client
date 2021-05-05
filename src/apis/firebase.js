import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCQrsS8gSqaLcvGSM7p3ge-7caGpNaY5ls",
  authDomain: "phim-pro.firebaseapp.com",
  projectId: "phim-pro",
  storageBucket: "phim-pro.appspot.com",
  messagingSenderId: "363158153927",
  appId: "1:363158153927:web:add237c4bc1d71f1b42ce2",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const storage = firebaseApp.storage();
export default storage;
