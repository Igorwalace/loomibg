import React from 'react'
import Header from '../pages/header'

// react icons
import { CiGrid41 } from "react-icons/ci";

// pages

function Page() {
  return (
    <>
      <Header />
      <div>

        <div className='p-5 text-center' >
          <h1 className='lg:text-4xl text-2xl font-extrabold flex justify-center items-center gap-2' >
            Suas Imagens
            <span><CiGrid41 /></span>
          </h1>
          <span className='lg:text-sm text-xs' >Aqui estão todas suas imagens.</span>
        </div>

        <div>
          {/* <ListFiles /> */}
        </div>

      </div>
    </>
  )
}

export default Page