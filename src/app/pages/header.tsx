import Link from 'next/link'
import React from 'react'

//fonts
import { caveat } from '../fonts/fonts'

//shadcn

//pages
import LinksHeader from './components/_links-header'
import LinksMobile from './components/LinksMobile'
import Loading from '../my-image/loading'
import DialogLogin from '../rbg/dialog-login'
import UserName from './userName'

function Header() {
  return (
    <>
      <Loading />
      <DialogLogin />
      <div className='px-5 py-3 flex items-center justify-between bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl border-b-2 border-white' >
        <Link href={'/'} id='logo' className={`${caveat.className} text-4xl font-extrabold text-[#006666]`} >Loomibg</Link>

        <LinksHeader />

        <UserName />

        <LinksMobile />
      </div>
    </>
  )
}

export default Header