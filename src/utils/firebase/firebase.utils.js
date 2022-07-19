// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEWrDver3EYlVDC7y0QXqCXjbNSbeFusI",
  authDomain: "clothing-shop-db-2740f.firebaseapp.com",
  projectId: "clothing-shop-db-2740f",
  storageBucket: "clothing-shop-db-2740f.appspot.com",
  messagingSenderId: "64377060184",
  appId: "1:64377060184:web:648aac90153cc05fdd432d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth();
export const singInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const singInWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndpassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callBack) => onAuthStateChanged(auth, callBack);