'use client'

// react
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// firebase
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../utils/firebase'

// appwrite
import { storage } from '../utils/appwrite'
import { Query } from 'appwrite';

// pages
import { BUCKET_ID_IMAGE } from '../components/upload'
import useAppUtils from '../context/utils'

// shadcn
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

// icons
import { Calendar, Download, Eye, ImageIcon, MoreVertical, Trash2 } from 'lucide-react'

function Galeria() {

    interface imagens {
        createdAt: number
        id: string;
        url: string;
        name: string;
        date: string;
        downloadUrl: string
    }[]

    const [user, setUser] = useState<User | null>(null)

    const [files, setFiles] = useState<imagens[]>([])
    const { setLoading } = useAppUtils()

    const [order, setOrder] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (!u) return
            setUser(u)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {

        const GET = async () => {
            if (!user) return;
            try {
                setLoading(true);

                if (!BUCKET_ID_IMAGE) {
                    return;
                }

                const result = await storage.listFiles({
                    bucketId: BUCKET_ID_IMAGE,
                    queries: [
                        Query.limit(1000)
                    ],
                });


                const resultsFilter = result.files.filter((file) => {
                    const match = file.name.includes(user.uid);
                    return match;
                });
                // getFileView(BUCKET_ID_IMAGE!, file.$id),
                const imagens = resultsFilter.map((file) => ({
                    id: file.$id,
                    url: storage.getFileView({
                        bucketId: BUCKET_ID_IMAGE!,
                        fileId: file.$id,
                    }),
                    name: file.name,
                    downloadUrl: storage.getFileDownload({
                        bucketId: BUCKET_ID_IMAGE!,
                        fileId: file.$id
                    }),
                    date: new Date(file.$createdAt).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    }),
                    createdAt: new Date(file.$createdAt).getTime(),
                }));

                setFiles(imagens);
            } catch (error) {
                console.error('💥 Erro ao carregar imagens:', error);
            } finally {
                setLoading(false);
            }
        };

        GET();
    }, [user, order, setLoading]);

    const DeleteFile = async (fileID: string) => {
        setLoading(true)
        try {
            await storage.deleteFile({
                bucketId: BUCKET_ID_IMAGE!,
                fileId: fileID
            });

            setFiles((prev) => prev.filter((file) => file.id !== fileID));

        } catch (error) {
            console.error("Erro ao deletar arquivo:", error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <main className="p-4 pb-7">

            <div className="flex items-center justify-between pb-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>{files.length} imagens</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className={`${order != 'Antigas' && 'bg-[#006666] text-white font-black'}`} onClick={() => {
                        setOrder('Recentes')
                    }} size="sm">
                        Recentes
                    </Button>
                    <Button variant="outline" className={`${order === 'Antigas' && 'bg-[#006666] text-white font-black'}`} onClick={() => {
                        setOrder('Antigas')
                    }} size="sm">
                        Mais Antigas
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">


                {
                    files
                        .sort((a, b) =>
                            order === 'Antigas'
                                ? a.createdAt - b.createdAt
                                : b.createdAt - a.createdAt
                        )
                        .map((file) => (
                            <div key={file.id} className='space-y-5' >
                                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                                    <div className="relative aspect-video overflow-hidden bg-muted">
                                        <Image
                                            src={file.url || "/placeholder.svg"}
                                            alt=''
                                            priority
                                            sizes='w-full'
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40">
                                            <div className="flex h-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">

                                                <AlertDialog>
                                                    <AlertDialogTrigger className='cursor-pointer bg-white flex justify-center gap-2 items-center px-4 py-2 rounded-sm' >
                                                        <Eye className="h-4 w-4" />
                                                        Visualizar
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className='md:w-3/4 w-[90%]' >
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Sua Imagem - Data: {file.date}

                                                            </AlertDialogTitle>
                                                            <div>
                                                                <div className="relative w-full md:h-[400px] h-[250px] bg-muted rounded-2xl">
                                                                    <Image
                                                                        src={file.url || "/cidade.png"}
                                                                        alt=''
                                                                        priority
                                                                        sizes='w-full'
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter className='' >

                                                            <AlertDialogCancel className='hover:scale-[1.04] duration-200 '>Voltar</AlertDialogCancel>
                                                            <Link className='hover:scale-[1.04] duration-200 bg-[#006666] text-white font-black flex justify-center items-center rounded-sm px-2 md:py-0 py-2' href={file.downloadUrl} >
                                                                Download
                                                            </Link>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 space-y-1">
                                                {/* <h3 className="font-medium leading-none text-card-foreground">Imagem</h3> */}
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{file.date}</span>
                                                </div>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Menu de opções</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <Link href={file.downloadUrl} >
                                                        <DropdownMenuItem className="gap-2 cursor-pointer">
                                                            <Download className="h-4 w-4" />
                                                            Baixar
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem  className="gap-2 text-destructive cursor-pointer">
                                                        <Trash2 className="h-4 w-4" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                }
            </div>
        </main>

    )
}

export default Galeria
