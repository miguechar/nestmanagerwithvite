import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAdUrll2Yr4wkf_Fe0X8JVT-tDJ4qkXZqI",
    authDomain: "nestbar-6833d.firebaseapp.com",
    databaseURL: "https://nestbar-6833d-default-rtdb.firebaseio.com",
    projectId: "nestbar-6833d",
    storageBucket: "nestbar-6833d.appspot.com",
    messagingSenderId: "600566296637",
    appId: "1:600566296637:web:7e7948e770ea9309e0fa54",
    measurementId: "G-095YCFK8Y0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage(app);

export const ip = "10.102.13.68";
export const port = "8070";