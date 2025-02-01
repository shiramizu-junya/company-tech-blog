// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getFirestore,
	onSnapshot,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';

// TODO: FirebaseConfigを記入
const firebaseConfig = {};

// TODO: Firestoreのコレクション名を記入
export const COLLECTION_NAME = '';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbRef = collection(db, COLLECTION_NAME);

export { addDoc, collection, db, dbRef, deleteDoc, doc, onSnapshot, Timestamp, updateDoc };
