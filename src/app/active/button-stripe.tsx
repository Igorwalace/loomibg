'use client'

import useAppUtils from '../context/utils'
import { handleCheckoutStripe } from './button-checkout'

export function useButtonStripe() {
    const { setLoading } = useAppUtils()

    return async () => {
        setLoading(true)
        await handleCheckoutStripe()
        setLoading(false)
    }
}
