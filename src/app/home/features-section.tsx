import { Card } from "@/components/ui/card"
import { Eraser, Images, Sparkles, Trash2, Wand2, Zap, } from "lucide-react"
import Link from "next/link"

const features = [
    {
        icon: Eraser,
        link: 'rbg',
        title: "Remoção de Fundo",
        description:
            "Remova fundos de qualquer imagem com precisão impecável. A detecção de bordas com IA garante resultados limpos em todos os casos.",
    },
    {
        icon: Zap,
        link: '/quality',
        title: "Velocidade Relâmpago",
        description:
            "Processe imagens em menos de um segundo. Sem esperas, sem atrasos — apenas resultados instantâneos que mantêm seu fluxo de trabalho acelerado.",
    },
    {
        icon: Sparkles,
        link: '/quality',
        title: "Melhorar Qualidade",
        description: "Aumente a resolução e qualidade de suas imagens com IA. Transforme fotos antigas em alta definição.",
    },
    {
        icon: Trash2,
        link: '/rgb',
        title: "Remover Marca D'água",
        description: "Elimine marcas d'água e objetos indesejados de forma inteligente, mantendo a qualidade da imagem.",
    },
    {
        icon: Wand2,
        link: '/text-to-image',
        title: "Gerar Imagens",
        description: "Crie imagens profissionais a partir de descrições em texto. Dê vida às suas ideias instantaneamente.",
    },
    {
        icon: Images,
        link: '/manage-plan',
        title: "Salve suas imagens",
        description: "Salve todas as suas imagens processadas.",
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl py-10">
            <div className="container mx-auto px-4" >
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
                        Tudo que você precisa para criar incríveis imagens.
                    </h2>
                    <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                        Ferramentas de IA de alto nivel, projetadas para criadores, profissionais de marketing e até para quem quer apenas se divertir.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-border bg-card p-6 transition-all hover:shadow-lg">
                            <Link href={feature.link} >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                                    <feature.icon className="h-6 w-6 text-[#006666]" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
                                <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
