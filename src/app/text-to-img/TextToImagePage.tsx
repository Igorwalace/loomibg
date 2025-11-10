'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import useAppUtils from "../context/utils";
import { API_KEY, CLICKDROP_URL_TEXT_TO_IMAGE } from "../utils/ts";
import { auth } from "../utils/firebase";
import DialogLogin from "../rbg/dialog-login";
import { BUCKET_ID_IMAGE } from "../components/upload";
import { storage } from "../utils/appwrite";
import { ID, Permission, Role } from "appwrite";
import Link from "next/link";

export default function TextToImagePage() {

    const [prompt, setPrompt] = useState<string>('')
    const [imageGenerating, setImageGenerating] = useState<string | null>(null)
    const [hiddenCard, setHiddenCard] = useState(false)
    const [download, setDownloand] = useState('')

    const user = auth.currentUser

    const { setLoading, loading, setDialogNoLogin } = useAppUtils()

    const handleGeneratingImage = async () => {
        if (user === null) {
            setDialogNoLogin(true)
            return
        }
        if (prompt === '') {
            alert('Digite uma descrição.')
            return
        }

        const form = new FormData()
        form.append('prompt', prompt)

        try {
            setLoading(true)
            if (!CLICKDROP_URL_TEXT_TO_IMAGE) return
            const response = await fetch(CLICKDROP_URL_TEXT_TO_IMAGE, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY!,
                },
                body: form,
            })
            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer], { type: "image/png" });

            const newFile = new File([blob], `${user?.uid}/${user?.uid}.png`, { type: "image/png" });

            if (!BUCKET_ID_IMAGE) return
            const result = await storage.createFile(
                BUCKET_ID_IMAGE,
                ID.unique(),
                newFile,
                [Permission.read(Role.any())]
            );
            const GetUrlFilePublic = storage.getFileView(BUCKET_ID_IMAGE, result.$id)
            const GetUrlDownload = storage.getFileDownload(BUCKET_ID_IMAGE, result.$id)

            setDownloand(GetUrlDownload)
            setImageGenerating(GetUrlFilePublic)
            console.log(GetUrlFilePublic)
            setHiddenCard(true)

            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
    const handleGeneratingNewImage = () => {
        setHiddenCard(false)
        setPrompt('')
        setImageGenerating('')
    }

    return (
        <div className="bg-muted rounded-2xl">
            <DialogLogin />
            <div className="container mx-auto px-4 py-10 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                        <Sparkles className="w-8 h-8 text-[#006666]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Crie Imagens a partir de Qualquer Frase</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Transforme suas palavras em imagens impressionantes.
                    </p>
                </div>

                <div className=" lg:grid-cols-2 gap-4">
                    {/* Input Section */}
                    <Card className={`p-4 space-y-1 ${hiddenCard && 'hidden'}`}>
                        <div className="space-y-2">
                            <label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-[#006666]" />
                                Descreva sua imagem
                            </label>
                            <textarea
                                id="prompt"
                                placeholder="Um cachorro na praia de bermuda."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="min-h-[200px] w-full rounded-2xl resize-none p-3 border-2 border-dashed border-border bg-muted/30"
                            // disabled={isGenerating}
                            />
                            <p className="text-xs text-muted-foreground">Seja específico e descritivo para obter melhores resultados.</p>
                        </div>

                        {/* {error && (
                            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )} */}

                        <Button
                            className="w-full h-12 font-black text-base bg-[#006666] hover:bg-[#006666] hover:scale-[1.01] text-primary-foreground"
                            size="lg"
                            onClick={handleGeneratingImage}
                            disabled={loading}
                        >
                            {
                                loading
                                    ?
                                    'Gerando Imagem'
                                    :
                                    'Gerar Imagem'

                            }
                        </Button>

                        {/* Example Prompts */}
                        <div className="pt-4 border-t space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Experimente estes exemplos:</p>
                            <div className="flex flex-wrap gap-2">
                                {["Uma cidade futurista à noite", "Robô fofo lendo um livro", "Padrão geométrico abstrato"].map(
                                    (example) => (
                                        <Button
                                            variant='default'
                                            key={example}
                                            onClick={() => setPrompt(example)}
                                            disabled={loading}
                                            className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors disabled:opacity-50"
                                        >
                                            {example}
                                        </Button>
                                    ),
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Output Section */}
                    <Card className={`p-4 space-y-1 ${!hiddenCard && 'hidden'}`}>
                        <div className="space-y-2">
                            <div className="flex md:flex-row flex-col gap-4 items-center justify-between py-3">
                                <label className="text-sm font-extrabold">Imagem Gerada - {prompt}</label>
                                {imageGenerating && (
                                    <Link href={download} className="hover:scale-[1.04] duration-200 text-sm flex justify-between items-center gap-1 bg-muted p-2 rounded-sm"
                                    
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Link>
                                )}
                            </div>

                            <div className="rounded-2xl border-2 border-dashed border-border bg-muted flex items-center justify-center overflow-hidden">
                                <div className="relative w-full min-h-[550px] rounded-2xl">
                                    {
                                        imageGenerating
                                        &&
                                        <Image
                                            className={`rounded-2xl object-contain bg-white`}
                                            src={imageGenerating}
                                            fill
                                            // onLoad={(e) => {
                                            //     const img = e.currentTarget
                                            //     img.style.opacity = '1'
                                            // }}
                                            alt="A sua nova imagem gerada por nossa IA."
                                        />
                                    }
                                </div>
                            </div>
                            <div className="py-5 w-full flex justify-center" >
                                <Button
                                    onClick={handleGeneratingNewImage}
                                    className="w-full bg-[#006666] hover:scale-[1.02] hover:bg-[#006666] font-extrabold" >
                                    Gerar nova imagem
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
