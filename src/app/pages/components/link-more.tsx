'use client'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { ChevronDown, ChevronUp, Expand, FileType, Replace } from 'lucide-react'

type LinkMoreProps = {
    pathname: string
}

function LinkMore({ pathname }: LinkMoreProps) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger className='focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none' >
                    Mais Ferramentas
                    {
                        open
                            ?
                            <ChevronUp />
                            :
                            <ChevronDown />
                    }
                </PopoverTrigger>
                <PopoverContent className='text-sm w-full' >
                    <div>
                        <p>Conheça mais das nossas ferramentas.</p>
                    </div>
                    <ul className="space-y-2 py-5">
                        <li>
                            <Link href="/text-to-img" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                                <FileType color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                                Transformar texto em imagem
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Replace color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                                Substituir plano de fundo
                            </Link>
                        </li>
                        <li>
                            <Link href="/upscaling" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Expand color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                                <span>
                                    Expandir imagem
                                </span>
                            </Link>
                        </li>
                    </ul>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default LinkMore