'use client'
//next-react
import { createContext, useContext, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function AppRemoveBg({ children }: {
    children: React.ReactNode;
}) {

    const [dialogRemoveBg, setDialogRemoveBg] = useState(false)

    const [file, setFile] = useState<File | undefined>(undefined)
    const [fileEdit, setFileEdit] = useState<File | undefined>(undefined)

    return (
        <AppContext.Provider value={{
            dialogRemoveBg, setDialogRemoveBg, file, setFile, fileEdit, setFileEdit
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppRemoveBg() {
    return useContext(AppContext)
}