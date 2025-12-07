// /app/hooks/useRequireAuth.ts
'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../utils/firebase"

export function useRequireAuth() {
    const router = useRouter()

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if (!user) {
                router.replace('/') 
            }
        })

        return () => unsub()
    }, [router])
}
