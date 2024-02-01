import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  projectId: "sveltekit-41b15",
  appId: "1:675259413627:web:5b5d868c74ce1c59f55ede",
  storageBucket: "sveltekit-41b15.appspot.com",
  apiKey: "AIzaSyBU_NWYuqHX5gdXosUXp6uazE6zVQJAuRk",
  authDomain: "sveltekit-41b15.firebaseapp.com",
  messagingSenderId: "675259413627",
  measurementId: "G-KLZLFLGS1H",
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(config);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);

export { app, auth };
