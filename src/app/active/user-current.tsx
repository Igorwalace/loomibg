"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAppPlanActive from "../context/planActive"

export default function UserCurrent() {
    const router = useRouter()
    const { userCurrent, loading } = useAppPlanActive()

    useEffect(() => {
        // Só faz redirect QUANDO JÁ CARREGOU
        if (loading && !userCurrent) {
            router.push("/")
        }
    }, [userCurrent, loading, router])

    return null
}
