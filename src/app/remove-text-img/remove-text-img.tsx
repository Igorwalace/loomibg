'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, Sparkles, Upload } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import useAppUtils from '../context/utils'
import useAppRemoveBg from '../context/remove-bg'
import { API_KEY, CLICKDROP_URL_REMOVE_TEXT } from '../utils/ts'
import { BUCKET_ID_IMAGE } from '../components/upload'
import { storage } from '../utils/appwrite'
import { ID } from 'appwrite'
import { auth } from '../utils/firebase'
import Image from 'next/image'
import { handleDownload } from '../rbg/download'
import { TostCredit } from '../components/tost-credit'
import VerifyCredit from '../active/verify-credit'
import useAppPlanActive from '../context/planActive'

function RemovetextImg() {

    const { setDialogNoLogin, setLoading, loading } = useAppUtils()
    const { setFile, file, setFileEdit, fileEdit } = useAppRemoveBg()

    const { veri, setVeri } = useAppPlanActive()

    const inputRef = useRef<HTMLInputElement | null>(null)

    const user = auth.currentUser

    useEffect(() => {
        setFile(undefined)
    }, [])

    const handleImageUpload = () => {
        setFile(undefined)
        inputRef.current?.click()
    }

    const ObterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxSize = 30 * 1024 * 1024; // 30MB
        const FILE = e.target.files?.[0]
        if (FILE!.size > maxSize) {
            alert("A imagem deve ter no máximo 30MB.");
            e.target.value = "";
            return;
        }
        setFile(FILE)
        e.target.value = "";
    }

    const handleRemoveText = async () => {
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

            if (!CLICKDROP_URL_REMOVE_TEXT) return
            const response = await fetch(CLICKDROP_URL_REMOVE_TEXT, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY!,
                },
                body: form,
            })
            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer], { type: "image/png" });

            const newFile = new File([blob], `removertext-${user?.uid}.png`, { type: "image/png" });

            if (!BUCKET_ID_IMAGE) return
            const result = await storage.createFile(
                BUCKET_ID_IMAGE,
                ID.unique(),
                newFile
            );
            const GetUrlFilePublic = storage.getFileView(BUCKET_ID_IMAGE, result.$id)

            // setHiddenCard(true)
            setFileEdit(GetUrlFilePublic)
            setVeri(!veri)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handleNewImage = () => {
        setFileEdit(undefined)
        setLoading(false)
        setFile(undefined)
    }

    return (
        <main className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl">
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                            <Sparkles className="w-8 h-8 text-[#006666]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Remoção de Remover Marca d'água</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Faça o upload de uma imagem e deixe a IA detectar e remover a marca d'água automaticamente, deixando a imagem limpa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <div className='grid grid-cols-2' >
                                <h2 className="text-xl font-semibold mb-4">Imagem original</h2>
                                {
                                    file
                                    &&
                                    <Button disabled={loading} variant="outline" size="sm" className="hover:scale-[1.04]"
                                        onClick={handleNewImage}
                                    >
                                        {/* <Download className="w-4 h-4 mr-2" /> */}
                                        Nova imagem
                                    </Button>
                                }
                            </div>
                            {
                                file
                                    ?
                                    <div className="relative w-[400px] h-[300px]">
                                        <Image
                                            src={file && URL.createObjectURL(file)}
                                            alt="Imagem Original"
                                            fill
                                            className="w-full h-80 object-contain rounded-lg bg-muted p-2"
                                        />
                                    </div>
                                    :
                                    <button onClick={handleImageUpload} className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted hover:scale-[1.04] cursor-pointer">
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium">Clique para carregar a imagem</p>
                                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</p>
                                            </div>
                                        </div>
                                        <input
                                            type='file'
                                            className='hidden'
                                            accept='image/png, image/webp, image/jpeg'
                                            ref={inputRef}
                                            onChange={(e) => { ObterImage(e) }}
                                        />
                                    </button>
                            }
                            {
                                file &&
                                <Button onClick={handleRemoveText} className="w-full mt-4 bg-[#006666] hover:scale-[1.02] hover:bg-[#006666] font-extrabold" disabled={loading} size="lg" >Remover texto</Button>
                            }
                        </Card>
                        <Card className="p-6">
                            <div className='grid grid-cols-2' >
                                <h2 className="text-xl font-semibold mb-4">Imagem Processada</h2>
                            </div>
                            {
                                fileEdit
                                    ?
                                    <>

                                        <div className="relative w-[400px] h-[300px]">
                                            <Image
                                                src={fileEdit}
                                                alt="Imagem Original"
                                                fill
                                                className="w-full h-80 object-contain rounded-lg bg-muted p-2"
                                            />
                                        </div>
                                    </>
                                    :
                                    <div className="flex items-center justify-center w-full h-80 border-2 border-dashed border-border rounded-lg bg-muted/20">
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                loading
                                                    ?
                                                    "Imagem está sendo processada..."
                                                    :
                                                    "A imagem processada aparecerá aqui"
                                            }
                                        </p>
                                    </div>
                            }
                            {
                                fileEdit
                                &&
                                <Button disabled={loading} variant="outline" size="sm" className="hover:scale-[1.04]"
                                    onClick={() => handleDownload(fileEdit)}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                            }
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RemovetextImg