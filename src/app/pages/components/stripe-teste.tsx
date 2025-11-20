'use client'
import { useButtonStripe } from '@/app/active/button-stripe';
import useAppPlanActive from '@/app/context/planActive';
import useAppUtils from '@/app/context/utils';
import { auth } from '@/app/utils/firebase';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BsInfoCircle } from 'react-icons/bs';

function Stripe() {
    const { loading } = useAppUtils()
    const { planCurrent } = useAppPlanActive()

    const user = auth.currentUser

    const checkout = useButtonStripe()

    return (
        <>
            {
                user
                    ?
                    planCurrent && planCurrent === 'Premium'
                        ?
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg shadow-lg"
                        >
                            ✨ {planCurrent}
                        </Button>
                        :
                        <div className='cursor-pointer duration-200 hover:scale-[1.02]'>
                            {
                                <>
                                    <div className='flex gap-2' >
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
                                                <div>Compre créditos e use como quiser em qualquer funcionalidade do Loomibg.</div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </>
                            }
                        </div>
                    :
                    ''
            }
        </>
    )
}

export default Stripe