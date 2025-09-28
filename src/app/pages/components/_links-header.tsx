'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function LinksHeader() {

    const pathname = usePathname();

    return (
        <div className='flex gap-10 text-sm' >
            <Link href={'/rbg'} className={`${pathname === '/rbg' && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >Remover Fundo</Link>
            <Link href={'/text-to-img'} className={`${pathname.includes('text-to-img') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >Transformar Imagem p/ Texto</Link>
            <Link href={'/remove-text-img'} className={`${pathname.includes('remove') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`}>Remover Texto da Imagem</Link>
            <Link href={'/'}>Mais</Link>
        </div>
    )
}

export default LinksHeader