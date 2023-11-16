// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    collection, 
    getDocs,
    getDoc, 
    doc, 
    query,
    where
} from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT9pGz1AAQ8zw28BsiFaED8Dgtkp7N6Tk",
  authDomain: "vanlife-ke.firebaseapp.com",
  projectId: "vanlife-ke",
  storageBucket: "vanlife-ke.appspot.com",
  messagingSenderId: "545519636388",
  appId: "1:545519636388:web:7d01802daccc6574e3fb31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans(){
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
   return vans
}

export async function getVan(id){
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }

}

export async function getHostVans(){
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
   return vans
}




export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}