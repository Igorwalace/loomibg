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

                <div className='relative z-10 min-h-[400px] flex items-center justify-center flex-col gap-4'>
                    <div
                        onClick={handleButtonClick}
                        className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center cursor-pointer"
                    >
                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center ring-1 ring-slate-200">
                            <Upload className="h-10 w-10 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-slate-900">Upload de sua imagem</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">
                                Arraste e solte seu arquivo aqui ou clique para procurar.
                            </p>
                        </div>
                        <span className="inline-flex h-12 items-center justify-center rounded-lg bg-[#006666] font-black px-8 text-sm text-white transition hover:scale-[1.02]">
                            Selecionar arquivos
                        </span>
                    </div>
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