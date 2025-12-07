'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

//shadcn
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// firebase
import { auth } from '@/app/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// reacticons
import { usePathname } from 'next/navigation';

// pages
import useAppUtils from '@/app/context/utils';
import ButtonCheckout from './button-checkout';
import { useSignOut } from '@/app/sign-out';
import LinkMore from './link-more';
import useAppPlanActive from '@/app/context/planActive';

function LinksMobile() {

    const { SignIn } = useAppUtils()
    const { handleSignOut } = useSignOut();

    const [name, setName] = useState<string | null>(null)

    const pathname = usePathname();
    const user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setName(user.displayName)
            }
            else {
                setName(null)
            }
        });
    }, [])

    return (
        <div>
            {
                user?.uid === undefined
                    ?
                    <button onClick={SignIn} className='rounded-lg cursor-pointer hover:scale-[1.02] duration-200 text-black font-extrabold flex gap-3 items-center justify-center' >
                        {/* <BsPersonCircle className="w-7 h-7 text-white" /> */}
                        <span className='text-sm text-[#006666] font-extrabold' > Login</span>
                    </button>
                    :
                    <>

                        <DropdownMenu>
                            <DropdownMenuTrigger className='rounded-lg cursor-pointer hover:scale-[1.02] duration-200 text-black font-extrabold gap-2 flex items-center justify-center' >
                                <Avatar className='border-1 hidden md:block border-white' >
                                    <AvatarImage src={user?.photoURL || undefined} />
                                    {
                                        name != undefined
                                        &&
                                        <AvatarFallback className='text-black' >{name.charAt(0) + name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                                    }
                                </Avatar>
                                <span className='text-sm text-[#006666] font-extrabold hidden md:block' >{user.displayName}</span>
                                <span className='md:hidden text-sm text-[#006666] font-extrabold' >Menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-[300px] min-h-[200px] mr-5 mt-5 p-5 bg-[#ffff] border-2 border-[#dfdfdf]' >

                                <DropdownMenuLabel className='flex justify-center' >
                                    <Avatar className='border-1 border-white w-30 h-30' >
                                        <AvatarImage src={user?.photoURL || undefined} />
                                        {
                                            name != undefined
                                            &&
                                            <AvatarFallback className='text-3xl flex justify-center items-center' >{name.charAt(0) + name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                                        }
                                    </Avatar>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel className='text-center' >{user.displayName}</DropdownMenuLabel>
                                <DropdownMenuLabel className='text-center text-xs m-0 pt-0 pb-5' >{user.email}</DropdownMenuLabel>

                                <DropdownMenuSeparator className='border-[#dfdfdf]' />

                                <div className='py-5' >
                                    <div className='pb-5 text-center' >
                                        <ButtonCheckout />
                                    </div>

                                    <DropdownMenuSeparator className='border-[#dfdfdf]' />

                                    <Link href='/manage-plan' className={`${pathname.includes('manage-plan') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`}>
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Gerenciar Compras
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/'} className={`${pathname === '/' && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Início
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href='/rbg' className={`${pathname === '/rbg' && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Remover Fundo
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/quality'} className={`${pathname.includes('quality') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Qualidade de imagens
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={'/remove-text-img'} className={`${pathname.includes('remove') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`}>
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Remover Marca d'água
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href='/my-image' className={`${pathname.includes('my-image') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`}>
                                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                            Meus salvos
                                        </DropdownMenuItem>
                                    </Link>
                                    <LinkMore pathname={pathname} />
                                </div>

                                <DropdownMenuSeparator className='border-[#dfdfdf]' />

                                <DropdownMenuItem onClick={handleSignOut} className='focus:bg-[#a91006] focus:text-white flex justify-center bg-[#a91006] text-white font-extrabold mt-5 cursor-pointer hover:bg-[#a91006] hover:scale-[1.02] duration-200' >Sair</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
            }
        </div>
    )
}

export default LinksMobile