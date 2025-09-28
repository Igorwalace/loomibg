import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCe3Qp4V1A3rQgoN9HSmo076GfeFN3-SPg",
  authDomain: "loomibg.firebaseapp.com",
  projectId: "loomibg",
  storageBucket: "loomibg.firebasestorage.app",
  messagingSenderId: "613459559411",
  appId: "1:613459559411:web:a54a6dd4736e681c994886"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

auth.useDeviceLanguage();