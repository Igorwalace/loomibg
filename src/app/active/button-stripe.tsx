'use client'

import { toast } from 'sonner'
import useAppUtils from '../context/utils'
import { auth } from '../utils/firebase'
import { handleCheckoutStripe } from './button-checkout'

export function useButtonStripe() {

    const user = auth.currentUser

    const { setLoading } = useAppUtils()

    return async () => {
        try {
            setLoading(true)
            if (!user) {
                toast.warning(
                    <span>
                        Faça login para continuar.
                    </span>
                )
                return
            }
            await handleCheckoutStripe()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
}
