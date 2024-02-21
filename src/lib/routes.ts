import { browser } from "$app/environment";
import { signInAnonymously } from "firebase/auth";
import { auth } from "$lib/firebase";

if (browser) {
  signInAnonymously(auth);
}

export const routes = [
  {
    path: "/",
    name: "Game 1",
  },
  {
    path: "/game2",
    name: "Game 2",
  },
  {
    path: "/game3",
    name: "Game 3",
  },
  {
    path: "/game4",
    name: "Game 4",
  },
  {
    path: "/game5",
    name: "Game 5",
  },
  {
    path: "/game6",
    name: "Game 6",
  },
  {
    path: "/colours",
    name: "Colour Picker",
  },
];
