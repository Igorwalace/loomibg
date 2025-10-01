'use client'
import { useEffect, useState } from 'react';

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
import { onAuthStateChanged, signOut } from 'firebase/auth';

// reacticons
import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from 'next/navigation';

// context
import useAppUtils from '@/app/context/utils';
import Link from 'next/link';

function SignIn() {

    const { SignIn } = useAppUtils()

    const [name, setName] = useState<string | null>(null)
    const user = auth.currentUser;

    const router = useRouter()

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

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log('User Desconect')
            router.push('/')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            {
                user?.uid === undefined
                    ?
                    <button onClick={SignIn} className='bg-[#006666] p-2 px-5 rounded-lg cursor-pointer hover:scale-[1.02] duration-200 text-black font-extrabold flex gap-3 items-center justify-center' >
                        <BsPersonCircle className="w-7 h-7 text-white" />
                        <span className='text-sm text-white font-extrabold' > Login</span>
                    </button>
                    :
                    <>

                        <DropdownMenu>
                            <DropdownMenuTrigger className='bg-[#006666] p-2 rounded-lg cursor-pointer hover:scale-[1.02] duration-200 text-black font-extrabold flex gap-2 items-center justify-center' >
                                <Avatar className='border-1 border-white' >
                                    <AvatarImage src={user?.photoURL || undefined} />
                                    {
                                        name != undefined
                                        &&
                                        <AvatarFallback>{name.charAt(0) + name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                                    }
                                </Avatar>
                                <span className='text-sm text-white font-extrabold' >{user.displayName}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-[300px] min-h-[200px] mr-5 mt-5 p-5 bg-[#dfdfdf] border-2 border-white' >

                                <DropdownMenuLabel className='flex justify-center' >
                                    <Avatar className='border-1 border-white w-20 h-20' >
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

                                <DropdownMenuSeparator className='bg-white' />

                                <div className='py-5' >
                                    <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
                                    <DropdownMenuItem>Meus Salvos</DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                                        <Link href='/my-image' >Minhas imagens</Link>
                                    </DropdownMenuItem>
                                </div>

                                <DropdownMenuSeparator className='bg-white' />

                                <DropdownMenuItem onClick={SignOut} className='focus:bg-[#a91006] focus:text-white flex justify-center bg-[#a91006] text-white font-extrabold mt-5 cursor-pointer hover:bg-[#a91006] hover:scale-[1.02] duration-200' >Sair</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
            }
        </div>
    )
}

export default SignIn