'use client'
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useRouter } from "next/navigation";
import useAppUtils from "./context/utils";
import useAppPlanActive from "./context/planActive";
import useAppRemoveBg from "./context/remove-bg";

export const useSignOut = () => {
    const router = useRouter();

    const { setLoading } = useAppUtils()
    const { resetPlanActive } = useAppPlanActive()
    const { resetRemoveBg } = useAppRemoveBg()

    async function handleSignOut() {
        try {
            setLoading(true)
            await signOut(auth);
            await resetPlanActive()
            await resetRemoveBg()
            router.push("/")
            router.refresh()
        } catch (err) {
            throw new Error('Erro ao desconectar')
        } finally {
            setLoading(false)
        }
    }

    return { handleSignOut };
};
