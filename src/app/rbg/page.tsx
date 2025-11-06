import React from 'react'
import Header from '../pages/header'
import RemoveBG from './remove-bg'

function RBG() {
    return (
        <>
            <main className='' >
                <Header />
                <div>
                    <div className='text-center p-5' >
                        <h1 className='mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl' >Removedor de Fundo</h1>
                        <h2 className='text-pretty text-lg leading-relaxed text-muted-foreground' >Apague fundos de diferentes imagens de sua escolha gratuitamente.</h2>
                    </div>
                    <div className='p-5 flex justify-center items-center' >
                        {/* brincadeira começa aqui */}
                        <RemoveBG />
                    </div>
                </div>
            </main>
        </>
    )
}

export default RBG