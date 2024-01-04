import { app } from './base';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, query, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

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
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

const getClubs = async () => {
    const club_array = [];
    const q = query(collection(db, "clubs"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(JSON.stringify(doc.data()).length);  // to get document size in bytes
        club_array.push(doc.data());
    });
    return club_array;
}


export { addData, setData, getData, getClubs, updateData };