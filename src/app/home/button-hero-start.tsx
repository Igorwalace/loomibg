'use client'
import { ArrowRight, Coins, Eraser, FileType, Image, Scissors, Sparkles } from 'lucide-react'
import React from 'react'

// shadcn
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { caveat } from '../fonts/fonts'

function ButtonHeroStart() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="bg-[#006666] hover:bg-[#006666] h-10 rounded-md px-6 flex items-center justify-center text-primary-foreground hover:scale-[1.01]">
                    Onde começar?
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[400px] h-' >
                    <Link href={'/'} id='logo' className={`${caveat.className} p-2 flex justify-center text-4xl font-extrabold text-[#006666]`} >Loomibg</Link>
                    <DropdownMenuSeparator />
                    <Link href='/manage-plan' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <Coins color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Comprar créditos
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/rbg' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <Scissors color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Remover Fundo
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/quality' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <Sparkles color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Melhorar qualidade de imagens
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/remove-text-img' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <Eraser color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Remover marca d'água
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/text-to-img' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <FileType color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Gerar imagens com IA
                        </DropdownMenuItem>
                    </Link>
                    <Link href='/my-image' className=' text-black border-b-2 border-[#006666]'>
                        <DropdownMenuItem className='cursor-pointer hover:scale-[1.02] duration-200' >
                            <Image color="#ffffff" className='bg-[#006666] p-1 rounded-xs' />
                            Ver imagens salvas
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}

export default ButtonHeroStart