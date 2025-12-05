import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function FeaturesRemoveText() {
    return (
        < div className="p-12 grid md:grid-cols-3 border-2 border-white gap-6 bg-linear-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl" >
            <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold mb-2">Com inteligência artificial</h3>
                <p className="text-sm text-muted-foreground">A IA avançada detecta e remove texto de forma imperceptível.</p>
            </Card>

            <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Processamento rápido</h3>
                <p className="text-sm text-muted-foreground">Obtenha resultados em segundos com algoritmos otimizados.</p>
            </Card>

            <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold mb-2">Resultados claros</h3>
                <p className="text-sm text-muted-foreground">Imagens com aparência natural e texto removido com precisão.</p>
            </Card>
        </div >
    )
}

export default FeaturesRemoveText