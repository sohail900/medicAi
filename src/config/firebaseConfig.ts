import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    collection,
    query,
    updateDoc,
    orderBy,
    where,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
    setDoc,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESS_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASURMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export {
    auth,
    provider,
    db,
    storage,
    collection,
    query,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    orderBy,
    where,
    doc,
    deleteDoc,
    setDoc,
}
