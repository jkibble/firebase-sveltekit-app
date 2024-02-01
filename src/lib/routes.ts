import { browser } from "$app/environment";
import { signInAnonymously } from "firebase/auth";
import { auth } from "$lib/firebase";

if (browser) {
  signInAnonymously(auth);
}

export const routes = [
  {
    id: "/",
    name: "Home",
  },
  {
    id: "/game1",
    name: "Game 1",
  },
  {
    id: "/game2",
    name: "Game 2",
  },
  {
    id: "/game3",
    name: "Game 3",
  },
  {
    id: "/game4",
    name: "Game 4",
  },
  {
    id: "/game5",
    name: "Game 5",
  },
  {
    id: "/game6",
    name: "Game 6",
  },
];
