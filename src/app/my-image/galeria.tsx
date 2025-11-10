'use client'

import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { storage } from '../utils/appwrite'
import { BUCKET_ID_IMAGE } from '../components/upload'
import useAppUtils from '../context/utils'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Eye } from 'lucide-react'
// import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
// import { DropdownMenuContent } from '@/components/ui/dropdown-menu'

function Galeria() {

    interface imagens {
        id: string;
        url: string;
        name: string;
    }[]

    const [files, setFiles] = useState<imagens[]>([])
    const { setLoading, loading } = useAppUtils()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log('Usuário não logado')
                return
            }

            try {
                setLoading(true)

                if (!BUCKET_ID_IMAGE) {
                    console.log('Não há bucket id imagem')
                    return
                }

                const result = await storage.listFiles(BUCKET_ID_IMAGE)

                const resultsFilter = result.files.filter((file) =>
                    file.name.includes(user.uid)
                )

                const imagens = resultsFilter.map((file) => ({
                    id: file.$id,
                    url: storage.getFileView(BUCKET_ID_IMAGE!, file.$id),
                    name: file.name,
                }))

                setFiles(imagens)
            } catch (error) {
                console.error('Erro ao carregar imagens:', error)
            } finally {
                setLoading(false)
            }
        })

        return () => unsub()
    }, [setLoading])

    return (
        <main className="p-4">
            {loading && <p>Carregando...</p>}

            {/* <div className="grid grid-cols-2 gap-4">
                {files.length > 0 ? (
                    files.map((file) => (
                        <div key={file.id} className="border rounded-xl overflow-hidden">
                            <Image
                                src={file.url}
                                width={400}
                                height={400}
                                alt={file.name}
                                className="object-cover"
                            />
                        </div>
                    ))
                ) : (
                    !loading && <p>Nenhuma imagem encontrada</p>
                )}
            </div> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {
                    files.map((file) => (
                        <Card key={file.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <Image
                                    src={file.url || "/placeholder.svg"}
                                    alt=''
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40">
                                    <div className="flex h-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button variant="secondary" size="sm" className="gap-2" >
                                            <Eye className="h-4 w-4" />
                                            Visualizar
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 space-y-1">
                                        <h3 className="font-medium leading-none text-card-foreground">Imagem</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>12/12/2025</span>
                                        </div>
                                    </div>

                                    {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Menu de opções</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Baixar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                                </div>

                                {/* <div className="mt-3">
                        <Badge variant="secondary" className="text-xs">
                            {image.size}
                        </Badge>
                    </div> */}
                            </div>
                        </Card>
                    ))
                }
            </div>
        </main>

    )
}

export default Galeria
