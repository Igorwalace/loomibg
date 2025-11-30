'use client'

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//prisma

//next-react
import { createContext, useContext, useState } from "react"

// firebase 
import { auth } from "../utils/firebase";

// appwrite 
import { databases } from "../utils/appwrite";

// ts
import { databaseId, tableId } from "../utils/ts";

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
            .then(async (result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;

                if (!user || !token || !credential) {
                    throw new Error('Erro ao fazer login.')
                }

                try {
                    await databases.createRow({
                        databaseId: databaseId!,
                        tableId: tableId!,
                        rowId: user.uid,
                        data: {
                            planActive: "NOPremium",
                            credit: 1,
                            name: user.displayName,
                            tokenUser: token,
                            email: user.email
                        },
                    });
                } catch (erro) {
                    await databases.updateRow({
                        databaseId: databaseId!,
                        tableId: tableId!,
                        rowId: user.uid,
                        data: {
                            name: user.displayName,
                            tokenUser: token,
                            email: user.email
                        },
                    });
                }

            }).catch(() => {
                console.log('Erro ao efetuar login.')
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