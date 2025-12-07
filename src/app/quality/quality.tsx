'use client'
import { Upload, Zap, X, Download } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import useAppRemoveBg from '../context/remove-bg'
import { auth } from '../utils/firebase'
import useAppUtils from '../context/utils'
import { cld } from '../utils/cloudinary'
import { upscale } from '@cloudinary/url-gen/actions/effect'
import Link from 'next/link'
import Image from 'next/image'
import { BUCKET_ID_IMAGE } from '../components/upload'
import { storage } from '../utils/appwrite'
import { ID, Permission, Role } from 'appwrite'
import { TostCredit } from '../components/tost-credit'
import VerifyCredit from '../active/verify-credit'
import useAppPlanActive from '../context/planActive'

function ImageUpscaling() {
    const { setFile, file } = useAppRemoveBg()
    const { setLoading, setDialogNoLogin } = useAppUtils()
    const user = auth.currentUser

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [resultUrl, setResultUrl] = useState<string | null>(null)

    const { veri, setVeri } = useAppPlanActive()

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const handleTriggerUpload = () => {
        inputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxSize = 30 * 1024 * 1024; // 30MB
        const selectedFile = e.target.files?.[0]

        if (!selectedFile) return;

        if (selectedFile.size > maxSize) {
            alert("A imagem deve ter no máximo 30MB.");
            e.target.value = "";
            return;
        }

        setFile(selectedFile)

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(objectUrl)
        setResultUrl(null)

        e.target.value = "";
    }

    const handleUpscalingImg = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Imagens"); 

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

            if (!process.env.NEXT_PUBLIC_API) {
                throw new Error('Falta de informações no servidor.')
            }

            const response = await fetch(
                process.env.NEXT_PUBLIC_API!,
                { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();

            const img = cld
                .image(data.public_id)
                .effect(
                    upscale()
                )
                .format("auto")
                .quality("auto");

            const improvedUrl = img.toURL();

            setResultUrl(improvedUrl);

            const improvedResponse = await fetch(improvedUrl);
            const improvedBlob = await improvedResponse.blob();
            const newFile = new File([improvedBlob], `quality-${user?.uid}.png`, { type: improvedBlob.type });

            if (!BUCKET_ID_IMAGE) return
            await storage.createFile(
                BUCKET_ID_IMAGE,
                ID.unique(),
                newFile,
                [Permission.read(Role.any())]
            );
            setVeri(!veri)

        } catch (error) {
            console.error(error);
            alert("Erro ao processar imagem.");
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setFile(undefined)
        setPreviewUrl(null)
        setResultUrl(null)
    }

    return (
        <main className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl text-slate-900 flex flex-col items-center justify-center p-4 md:p-8 selection:bg-blue-100">
            <div className="w-full max-w-5xl mx-auto space-y-12">

                {/* Header Content */}
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm text-slate-600 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        AI Upscaler 2.0
                    </div>
                    <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
                        Melhore a qualidade suas fotos.
                    </h1>
                </div>

                {/* Main Interaction Area */}
                <div className="w-full relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xl shadow-slate-200/50 min-h-[400px]">

                        {/* VIEW 1: No File Selected (Upload Mode) */}
                        {!previewUrl && (
                            <div
                                onClick={handleTriggerUpload}
                                className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center cursor-pointer hover:bg-slate-50/50 transition"
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
                        )}

                        {/* VIEW 2: File Selected (Preview & Result Mode) */}
                        {previewUrl && (
                            <div className="flex-1 flex flex-col md:flex-row h-full">
                                {/* Original Image */}
                                <div className="flex-1 p-4 border-r border-slate-100 flex flex-col gap-2 items-center justify-center bg-slate-50/50">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Imagem Original</span>
                                    <Image
                                        src={previewUrl}
                                        alt="Upscaled"
                                        width={400}
                                        height={400}
                                        className="max-h-[400px] object-contain rounded-md shadow-sm" />
                                </div>

                                {/* Result Image (Only shows if resultUrl exists) */}
                                {resultUrl && (
                                    <div className="flex-1 p-4 flex flex-col gap-2 items-center justify-center bg-blue-50/30">
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Gerada pela IA</span>
                                        <Image
                                            src={resultUrl}
                                            alt="Upscaled"
                                            width={400}
                                            height={400}
                                            className="max-h-[400px] object-contain rounded-md shadow-sm" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hidden Input */}
                        <input
                            type="file"
                            className="hidden"
                            accept='image/png, image/webp, image/jpeg, image/jpg'
                            ref={inputRef}
                            onChange={handleFileChange}
                        />

                        {/* Toolbar (Only visible if file is selected) */}
                        {previewUrl && (
                            <div className="h-16 border-t border-slate-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur">
                                <button
                                    onClick={handleReset}
                                    className="text-sm text-slate-500 hover:scale-[1.04] duration-200 cursor-pointer font-medium flex items-center gap-1"
                                >
                                    <X className="w-4 h-4" /> Cancelar
                                </button>

                                <div className="flex gap-2">
                                    {!resultUrl ? (
                                        <button
                                            onClick={handleUpscalingImg}
                                            className="inline-flex items-center gap-2 bg-[#006666] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:scale-[1.02] cursor-pointer duration-200 transition shadow-sm"
                                        >
                                            <Zap className="h-4 w-4" />
                                            Melhorar imagem
                                        </button>
                                    ) : (
                                        <Link
                                            href={resultUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#006666] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:scale-[1.02] transition shadow-sm"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ImageUpscaling