import React from 'react'
import Header from '../pages/header'

// react icons
import Galeria from './galeria';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Footer } from '../home/footer';

// pages

function Page() {
  return (
    <>
      <Header />
      <div>

        <div className='text-center' >
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              <div className='text-left' >
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Minha Galeria</h1>
                <p className="mt-1 text-sm text-muted-foreground">Todas as suas imagens em um só lugar</p>
              </div>

              {/* <div className="flex md:flex-row flex-col gap-4 items-center justify-between py-3">
                <Button variant="outline" size="sm" className="hover:scale-[1.04]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div> */}

            </div>
          </div>
        </div>

        <div className='' >
          <Galeria />
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Page