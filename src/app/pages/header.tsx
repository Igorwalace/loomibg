import Link from 'next/link'
import React from 'react'

//fonts
import { caveat } from '../fonts/fonts'

//shadcn
import { Separator } from '@/components/ui/separator'

//pages
import SignIn from './components/sign-in'
import LinksHeader from './components/_links-header'

function Header() {
  return (
    <>
      <div className='px-5 py-3 flex items-center justify-between bg-[] rounded-2xl' >
        <Link href={'/'} id='logo' className={`${caveat.className} text-4xl font-extrabold text-[#006666]`} >Loomibg</Link>

        <LinksHeader />

        <SignIn />
      </div>
      {/* <Separator className='rounded-b-2xl' /> */}
    </>
  )
}

export default Header