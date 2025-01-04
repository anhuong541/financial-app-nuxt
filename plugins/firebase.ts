import { getFirestore, getDocs, type DocumentData, CollectionReference, getDoc, DocumentReference } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = config.public.firebaseConfig;

  const getFirebaseDocs = async (colRef: CollectionReference<DocumentData, DocumentData>) => {
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document Data
    }));
  };

  const getFirebaseDoc = async (docRef: DocumentReference<DocumentData, DocumentData>) => {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("firebaseProvider", provider);
  nuxtApp.provide("getFirebaseDocs", getFirebaseDocs);
  nuxtApp.provide("getFirebaseDoc", getFirebaseDoc);
});
