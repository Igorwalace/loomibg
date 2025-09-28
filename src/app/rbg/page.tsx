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
                        <h1 className='text-5xl font-black' >Removedor de Fundo</h1>
                        <h2 className='text-base' >Apague fundos de diferentes imagens de sua escolha gratuitamente.</h2>
                    </div>
                    <div className='mb-10 flex justify-center items-center' >
                        {/* brincadeira começa aqui */}
                        <RemoveBG />
                    </div>
                </div>
            </main>
        </>
    )
}

export default RBG