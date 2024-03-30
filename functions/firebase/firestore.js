import  app  from './base.js';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, query, updateDoc } from "firebase/firestore";
import { initializeFirestore } from 'firebase/firestore';

// const db = getFirestore(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true, useFetchStreams: false});

// add a new document
const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// set a new document, overwriting any existing data
const setData = async (collectionName, docName, data) => {
    try {
        await setDoc(doc(db, collectionName, docName), data);
    } catch (e) {
        console.error("Error setting document: ", e);
    }
}

// update a document, keeping the existing data
const updateData = async (collectionName, docName, data) => {
    try {
        await updateDoc(doc(db, collectionName, docName), data);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

const getData = async (collectionName, docName) => {
    //console.log(collectionName, docName)
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // console.log(JSON.stringify(docSnap.data()).length);  // to get document size in bytes
        console.log(`Loaded: ${collectionName} (${docName})`)
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

const getClubs = async () => {
    const club_array = [];
    const q = query(collection(db, "clubs"));
    let querySnapshot = await getDocs(q);
    while (querySnapshot.size === 0) {
        try {
            querySnapshot = await getDocs(q);
            console.log("snapshot length: ", querySnapshot.size);
        } catch (e) {
            console.error("Error getting clubs: ", e);
        }
    }
    querySnapshot.forEach((doc) => {
        // console.log(JSON.stringify(doc.data()).length);  // to get document size in bytes
        club_array.push(doc.data());
    });
    console.log("Loaded: clubs")
    return club_array;
}

const getModels = async () => {
    const models_array = [];
    const q = query(collection(db, "ml_models"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(JSON.stringify(doc.data()).length);  // to get document size in bytes
        models_array.push(doc.data());
    });
    console.log("Loaded: models")
    return models_array;
}


export { addData, setData, getData, getClubs, updateData, getModels };