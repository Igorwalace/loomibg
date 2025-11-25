'use client'

//shadcn
import { Button } from '@/components/ui/button';

//react
import React, { useEffect, useRef, useState } from 'react'

// react-icons
import { LuPlus } from "react-icons/lu";

//firebase
import { auth } from '../utils/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

//pages
import DialogLogin from './dialog-login';

//context
import useAppUtils from '../context/utils';
import useAppRemoveBg from '../context/remove-bg';
import DialogRemoveBg from './dialog-remove-bg';
import { Upload } from 'lucide-react';

function RemoveBG() {

    const { setDialogNoLogin } = useAppUtils()
    const { setDialogRemoveBg, setFile } = useAppRemoveBg()

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [user, setUser] = useState<User | null>(null)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (!u) return
            setUser(u)
        })
        return () => unsubscribe()
    }, [])

    const handleButtonClick = () => {
        setFile(undefined)
        if (user === null) {
            setDialogNoLogin(true)
            return
        }
        inputRef.current?.click()
    }

    const ObterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const FILE = e.target.files?.[0]
        setFile(FILE)

        setDialogRemoveBg(true)
        e.target.value = "";
    }

    return (
        <>
            <div className='relative lg:w-[60%] md:w-[70%] w-[95%] h-[420px] mb-5 border-2 border-dashed border-border bg-white rounded-2xl'>
                <DialogRemoveBg />
                {/* <Image
                    className='absolute z-0 rounded-2xl'
                    src='/banner.png'
                    priority={true}
                    fill
                    sizes="(max-width: 640px), (max-height: 420px)"
                    alt='Banner de fundo'
                /> */}

                <div className='relative z-10 w-full h-full flex items-center justify-center flex-col gap-4'>
                    <button onClick={handleButtonClick} className="flex h-16 w-16 items-center justify-center rounded-full bg-muted hover:scale-[1.04] cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </button>
                    {
                        <Button onClick={handleButtonClick} className='py-8 px-6 bg-[#006666] hover:bg-[#006666] hover:scale-[1.02]' >
                            <span className='rounded-xl bg-[#347878] p-2' ><LuPlus color='white' /></span>
                            <span className='font-black' >Iniciar com uma Imagem</span>
                        </Button>

                    }
                    <span className='text-sm font-bold' >Ou solte uma imagem (em breve)</span>
                    <input
                        type='file'
                        className='hidden'
                        accept='image/png, image/webp, image/jpeg'
                        ref={inputRef}
                        onChange={(e) => { ObterImage(e) }}
                    />
                </div>
            </div>
        </>
    )
}

export default RemoveBG