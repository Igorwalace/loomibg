'use client'

// react
import Image from 'next/image'
import { useEffect, useState } from 'react';

// react icons
import { BsInfoCircle } from 'react-icons/bs';

// db
import { ID, Permission, Role } from 'appwrite'
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
import { API_KEY, CLICKDROP_URL_REMOVE_BG, messages } from '../utils/ts';

// framer motion
import { motion } from "framer-motion";
import { Download } from 'lucide-react';
import Link from 'next/link';
import { TostCredit } from '../components/tost-credit';
import VerifyCredit from '../active/verify-credit';
import useAppPlanActive from '../context/planActive';

function DialogRemoveBg() {

    const { dialogRemoveBg, setDialogRemoveBg, file, fileEdit, setFileEdit } = useAppRemoveBg()
    const { setLoading, loading, setDialogNoLogin } = useAppUtils()
    const { veri, setVeri } = useAppPlanActive()

    const user = auth.currentUser

    const [check, setCheck] = useState(false)
    const [textGerention, setTextGerantion] = useState<string>('')
    const [hiddenCard, setHiddenCard] = useState(false)
    const [download, setDownloand] = useState('')

    const ResetState = () => {
        setDialogRemoveBg(false)
        setFileEdit(undefined)
        setHiddenCard(false)
    }

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

    const RemoveBG = async () => {
        setLoading(true)

        if (!file) {
            return
        }

        const form = new FormData();
        form.append("image_file", file);

        try {
            setLoading(true)
            if (!user) {
                setDialogNoLogin(true)
                return
            }

            const check = await VerifyCredit()
            if (check.status === 403) {
                console.log('Erro. SEM CRÉDITOS')
                TostCredit('Seu saldo está zerado. Você precisa comprar créditos para continuar.')
                return
            }

            if (!CLICKDROP_URL_REMOVE_BG) return
            const response = await fetch(CLICKDROP_URL_REMOVE_BG, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY!,
                },
                body: form,
            })

            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer], { type: "image/png" });

            const newFile = new File([blob], `rbg-${user?.uid}.png`, { type: "image/png" });

            if (!BUCKET_ID_IMAGE) return
            const result = await storage.createFile(
                BUCKET_ID_IMAGE,
                ID.unique(),
                newFile,
                [Permission.read(Role.any())]
            );
            const GetUrlFilePublic = storage.getFileView(BUCKET_ID_IMAGE, result.$id)
            const GetUrlDownload = storage.getFileDownload(BUCKET_ID_IMAGE, result.$id)

            setHiddenCard(true)
            setDownloand(GetUrlDownload)
            setFileEdit(GetUrlFilePublic)

            setVeri(!veri)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>

            <Dialog onOpenChange={setDialogRemoveBg} open={dialogRemoveBg}>
                <DialogContent
                    className='w-[100%] md:w-[50%] bg-[#dfdfdf] border-2 lg:max-h-[90vh] max-h-[80vh] border-white overflow-y-auto'
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className='text-center pb-3 flex justify-between items-center'
                        >
                            <div className='flex justify-center gap-2 items-center' >
                                <motion.span
                                >
                                    Sua imagem
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
                            </div>
                            {
                                fileEdit
                                &&
                                <Link href={download} className="hover:scale-[1.04] duration-200 text-sm flex justify-between items-center gap-1 bg-muted p-2 rounded-sm"

                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Link>
                            }
                        </DialogTitle>

                        <Separator className='bg-white' />
                        <div className={`${loading ? 'justify-between' : 'justify-center'} flex md:flex-row flex-col-reverse gap-2 w-full items-center py-3`} >

                            {/* imagem do user */}
                            {
                                !loading
                                &&
                                <div className={`${hiddenCard && 'hidden'} relative w-full min-h-[400px] rounded-2xl bg-white`}>
                                    <Image
                                        className={`rounded-2xl ${!check ? 'object-contain p-2' : "object-cover"} border-2 border-white`}
                                        src={file && URL.createObjectURL(file)}
                                        fill
                                        alt="A imagem que você enviou."
                                    />
                                </div>
                            }

                            {/* imagem editada */}
                            {
                                fileEdit
                                &&
                                <div className={`${!hiddenCard && 'hidden'} relative w-full min-h-[400px] rounded-2xl bg-muted`}>
                                    <Image
                                        className={`rounded-2xl ${!check ? 'object-contain p-2' : "object-cover"} opacity-0 duration-3000 border-2 border-white`}
                                        src={fileEdit}
                                        fill
                                        onLoad={(e) => {
                                            const img = e.currentTarget
                                            img.style.opacity = '1'
                                        }}
                                        alt="A sua nova imagem gerada por nossa IA."
                                    />
                                </div>
                            }
                            {
                                loading
                                &&
                                <div className="relative w-full min-h-[400px] rounded-2xl bg-white flex items-center justify-center flex-col gap-5">
                                    <span className="loader"></span>
                                    <motion.span
                                        key={textGerention}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className='text-sm font-extrabold' >{textGerention}</motion.span>
                                </div>
                            }

                        </div>
                        <Separator className='bg-white' />
                        {
                            !fileEdit
                                ?
                                <div className='flex flex-col md:flex-row gap-2 pt-3' >
                                    <button
                                        onClick={RemoveBG}
                                        disabled={loading}
                                        className={`${loading && 'w-full durantion-200 hover:scale-[1] bg-[#ccc]'} bg-[#006666] text-white cursor-pointer hover:scale-[1.01] w-full md:w-2/4 rounded-md font-extrabold px-4 py-2 duration-200`}
                                    >
                                        {
                                            !loading
                                                ?
                                                'Remover fundo'
                                                :
                                                'Loading'
                                        }
                                    </button>
                                    <button
                                        onClick={ResetState}
                                        disabled={loading}
                                        className={` bg-white text-black cursor-pointer hover:scale-[1.01] w-full md:w-2/4 rounded-md font-extrabold px-4 py-2 duration-200`}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                :
                                <div className='flex flex-col md:flex-row gap-2 pt-3' >
                                    <button
                                        onClick={() => {
                                            setDialogRemoveBg(false)
                                            setFileEdit(undefined)
                                            setHiddenCard(false)
                                        }}
                                        disabled={loading}
                                        className="hover:scale-[1.04] w-full text-center text-lg duration-200 font-black bg-muted p-2 rounded-sm"

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