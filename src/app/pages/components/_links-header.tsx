'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import Stripe from './stripe-teste';
import LinkMore from './link-more';

function LinksHeader() {

    const pathname = usePathname();

    return (
        <div className='gap-10 text-sm hidden lg:flex items-center justify-center' >
            <Link href={'/'} className={`${pathname === '/' && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >Início</Link>
            <Link href={'/rbg'} className={`${pathname === '/rbg' && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >Remover Fundo</Link>
            <Link href={'/quality'} className={`${pathname.includes('quality') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`} >Qualidade de imagens</Link>
            <Link href={'/remove-text-img'} className={`${pathname.includes('remove') && 'font-bold text-[#006666] border-b-2 border-[#006666]'}`}>Remover Marca d'água</Link>
            <LinkMore pathname={pathname} />
            <div>
                <Stripe pathname={pathname} />
            </div>
        </div>
    )
}

export default LinksHeader