import React from 'react'
import Header from '../pages/header'
import RemoveBG from './remove-bg'
import { Footer } from '../home/footer'
import { Sparkles } from 'lucide-react'

function RBG() {
    return (
        <>
            <main className='' >
                <Header />
                <div className='bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl' >
                    <div className='text-center p-5  rounded-2xl pt-10' >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                            <Sparkles className="w-8 h-8 text-[#006666]" />
                        </div>
                        <h1 className='mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl' >Removedor de Fundo</h1>
                        {/* <h2 className='text-pretty text-lg leading-relaxed text-muted-foreground' >Apague fundos de diferentes imagens de sua escolha gratuitamente.</h2> */}
                    </div>
                    <div className='p-- flex justify-center items-center rounded-2xl pb-10' >
                        {/* brincadeira começa aqui */}
                        <RemoveBG />
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export default RBG