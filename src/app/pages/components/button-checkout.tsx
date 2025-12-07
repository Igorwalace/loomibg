'use client'

import { useButtonStripe } from '@/app/active/button-stripe'
import useAppPlanActive from '@/app/context/planActive'
import useAppUtils from '@/app/context/utils'
import { auth } from '@/app/utils/firebase'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'

function ButtonCheckout() {
    const router = useRouter()
    const { planCurrent } = useAppPlanActive()
    const { loading } = useAppUtils()
    const user = auth.currentUser

    const checkout = useButtonStripe()

    return (
        <>
            {
                user &&
                    planCurrent && planCurrent === 'Premium'
                    ?
                    <>
                        <Button
                            size="lg"
                            onClick={()=>{
                            router.push('/manage-plan')
                        }}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg shadow-lg"
                        >
                            ✨ {planCurrent}
                        </Button>
                    </>
                    :
                    <>
                        <div className='flex gap-2 justify-center items-center cursor-pointer duration-200 hover:scale-[1.02]' >
                            <button disabled={loading} onClick={checkout} >
                                {
                                    loading
                                        ?
                                        'Redirecionando'
                                        :
                                        'Comprar créditos'
                                }
                            </button>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer' >
                                    <BsInfoCircle />
                                </PopoverTrigger>
                                <PopoverContent className="text-sm">
                                    <div>
                                        Compre créditos e use como quiser em qualquer funcionalidade do Loomibg.
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </>
            }
        </>
    )
}

export default ButtonCheckout