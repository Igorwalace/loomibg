'use client'

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//prisma

//next-react
import { createContext, useContext, useState } from "react"
import { auth } from "../utils/firebase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function AppUtils({ children }: {
    children: React.ReactNode;
}) {

    const [loading, setLoading] = useState(false)
    const [dialogNoLogin, setDialogNoLogin] = useState(false)

    const SignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // const user = result.user;
            }).catch(() => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.customData.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <AppContext.Provider value={{
            dialogNoLogin, setDialogNoLogin, loading, setLoading, SignIn
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppUtils() {
    return useContext(AppContext)
}