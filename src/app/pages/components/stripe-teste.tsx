'use client'
import useAppPlanActive from '@/app/context/planActive';
import { auth } from '@/app/utils/firebase';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsInfoCircle } from 'react-icons/bs';

interface StripeProps {
    pathname: string
}

function Stripe({ pathname }: StripeProps) {
    const router = useRouter()
    const { planCurrent } = useAppPlanActive()

    const user = auth.currentUser
    return (
        <>
            {
                user
                    ?
                    planCurrent && planCurrent === 'Premium'
                        ?
                        <Button onClick={() => {
                            router.push('/manage-plan')
                        }}
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg shadow-lg"
                        >
                            ✨ Premium
                        </Button>
                        :
                        <div className='cursor-pointer duration-200 hover:scale-[1.02]'>
                            {
                                <>
                                    <div className={`${pathname.includes('manage') && 'font-bold text-[#006666] border-b-2 border-[#006666]'} flex gap-2`}  >
                                        <Link href={'/manage-plan'}>
                                            Gerenciar Compras
                                        </Link>
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