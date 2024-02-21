import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyApMVJNIw98Fy-O9N9Ba4yDlFp6Op_ViZo",
  authDomain: "formidable-app-362021.firebaseapp.com",
  projectId: "formidable-app-362021",
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(config);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);

export { app, auth };
