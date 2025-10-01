'use client'

// react
import Image from 'next/image'
import { useEffect, useState } from 'react';

// react icons
import { BsInfoCircle } from 'react-icons/bs';

// db
import { ID } from 'appwrite'
import { BUCKET_ID_IMAGE } from '../components/upload'
import { storage } from '../utils/appwrite'

// context
import useAppRemoveBg from '@/app/context/remove-bg'
import useAppUtils from '@/app/context/utils'

// shadcn
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from '@/components/ui/checkbox';

// utils
import { auth } from '../utils/firebase';
import { API_KEY, CLICKDROP_URL_REMOVE_BG, messages, phrases } from '../utils/ts';

// framer motion
import { motion } from "framer-motion";

function DialogRemoveBg() {

    const { dialogRemoveBg, setDialogRemoveBg, file, fileEdit, setFileEdit } = useAppRemoveBg()
    const { setLoading, loading } = useAppUtils()
    
    const user = auth.currentUser
        
    const [check, setCheck] = useState(false)
    const [textGerention, setTextGerantion] = useState<string>('')
    const [phrase, setPhrase] = useState('')

    useEffect(() => {
        if (!loading) return

        const B = Math.floor(Math.random() * messages.length)
        let i = B

        setTextGerantion(messages[B])

        const intervalo = setInterval(() => {
            i = (i + i) % messages.length
            setTextGerantion(messages[i])
        }, 5000);

        return () => clearInterval(intervalo)
    }, [loading])

    useEffect(() => {
        const PHRASE = phrases[Math.floor(Math.random() * phrases.length)]
        setPhrase(PHRASE)
    }, [])

    const RemoveBG = async () => {
        setLoading(true)

        if (!file) {
            return
        }
        console.log('ok')

        const form = new FormData();
        form.append("image_file", file);

        try {
            setLoading(true)
            const response = await fetch(CLICKDROP_URL_REMOVE_BG!, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY!,
                },
                body: form,
            })
            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer], { type: "image/png" });

            const newFile = new File([blob], `${user?.uid}/your-image.png`, { type: "image/png" });

            const result = await storage.createFile(
                BUCKET_ID_IMAGE!,
                ID.unique(),
                newFile
            );
            const GetUrlFilePublic = storage.getFileView(BUCKET_ID_IMAGE!, result.$id)
            setFileEdit(GetUrlFilePublic)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = fileEdit;
        link.target = "_blank";
        link.rel = "noopener noreferrer"; 
        link.click();
    };


    return (
        <>

            <Dialog onOpenChange={setDialogRemoveBg} open={dialogRemoveBg}>
                <DialogContent
                    className='w-[100%] md:w-[70%] bg-[#dfdfdf] border-2 border-white'
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className='text-center pb-3 flex justify-center gap-2 items-center'
                        >
                            <motion.span
                            >
                                {phrase}
                            </motion.span>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer' >
                                    <BsInfoCircle />
                                </PopoverTrigger>
                                <PopoverContent className="text-sm">
                                    <label className="flex items-center justify-center gap-3 cursor-pointer">
                                        <Checkbox
                                            checked={check}
                                            onCheckedChange={() => { setCheck(!check) }}
                                        />
                                        <span>Mostrar foto completa? (sem cortes)</span>
                                    </label>
                                </PopoverContent>

                            </Popover>
                        </DialogTitle>
                        <Separator className='bg-white' />
                        <div className={`${loading ? 'justify-between' : 'justify-center'} flex gap-2 w-full items-center py-3`} >

                            {/* imagem do user */}
                            <div className="relative w-2/4 min-h-[400px] bg-white rounded-2xl p-5">
                                <Image
                                    className={`rounded-2xl ${!check ? 'object-contain p-2' : "object-cover"} border-2 border-white`}
                                    src={file && URL.createObjectURL(file)}
                                    fill
                                    alt="A imagem que você enviou."
                                />
                            </div>

                            {/* imagem editada */}
                            {
                                fileEdit
                                &&
                                <div className="relative w-2/4 min-h-[400px] bg-white rounded-2xl">
                                    <Image
                                        className={`rounded-2xl ${!check ? 'object-contain p-2' : "object-cover"} opacity-0 duration-3000 border-2 border-white`}
                                        src={fileEdit}
                                        fill
                                        onLoadingComplete={(img) => {
                                            img.style.opacity = '1'
                                        }}
                                        alt="A sua nova imagem gerada por nossa IA."
                                    />
                                </div>
                            }
                            {
                                loading
                                &&
                                <div className="relative w-2/4 min-h-[400px] flex items-center justify-center flex-col gap-5 rounded-2xl bg-white">
                                    <span className="loader"></span>
                                    <motion.span
                                        key={textGerention}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        className='text-sm font-extrabold' >{textGerention}</motion.span>
                                </div>
                            }
                        </div>
                        <Separator className='bg-white' />
                        {
                            !fileEdit
                                ?
                                <div className='flex gap-2 pt-3' >
                                    <button
                                        onClick={RemoveBG}
                                        disabled={loading}
                                        className={`${loading && 'w-full durantion-200 hover:scale-[1]'} bg-[#006666] text-white cursor-pointer hover:scale-[1.01] w-2/4 rounded-md font-extrabold px-4 py-2 duration-200`}
                                    >
                                        Gerar Imagem
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFileEdit(undefined)
                                            setDialogRemoveBg(false)
                                        }}
                                        disabled={loading}
                                        className={`${loading && 'hidden'} bg-white text-black cursor-pointer hover:scale-[1.01] w-2/4 rounded-md font-extrabold px-4 py-2 duration-200`}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                :
                                <div className='flex gap-2 pt-3' >
                                    <button
                                        onClick={handleDownload}
                                        className={`bg-[#006666] cursor-pointer hover:scale-[1.01] w-2/4 rounded-md text-white px-4 py-2 duration-200`}
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFileEdit(undefined)
                                            setDialogRemoveBg(false)
                                        }}
                                        disabled={loading}
                                        className={`bg-white cursor-pointer hover:scale-[1.01] w-2/4 rounded-md text-black font-extrabold px-4 py-2 duration-200`}
                                    >
                                        Fechar
                                    </button>
                                </div>
                        }
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogRemoveBg