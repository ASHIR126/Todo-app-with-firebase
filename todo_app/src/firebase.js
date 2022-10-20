
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXpj8ZFlaaAfz1HNgatlOZJPt2zZizWig",
    authDomain: "todo-app-44957.firebaseapp.com",
    projectId: "todo-app-44957",
    storageBucket: "todo-app-44957.appspot.com",
    messagingSenderId: "698043653577",
    appId: "1:698043653577:web:efc066cd7f66a75370dc18"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)