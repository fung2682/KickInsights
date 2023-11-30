import { app } from './base';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const setData = async (collectionName, docName, data) => {
    try {
        await setDoc(doc(db, collectionName, docName), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getData = async (collectionName, docName) => {
    console.log(collectionName, docName)
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}


export { addData, setData, getData };