'use client'
import { useRouter } from "next/navigation"
import useAppRemoveBg from "../context/remove-bg"
import useAppPlanActive from "../context/planActive"

export default function ResetContextClient() {

    const router = useRouter()

    const { resetRemoveBg } = useAppRemoveBg()
    const { resetPlanActive } = useAppPlanActive()

    const resetAll = () => {
        resetRemoveBg()
        resetPlanActive()
        router.push("/")
    }

    return { resetAll }

}
