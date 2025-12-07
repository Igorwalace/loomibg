"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wand2, Sparkles, Eraser, ImagePlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export function MagicDemoSection() {
    const [activeTab, setActiveTab] = useState("remove-bg")

    const demos = [
        {
            id: "remove-bg",
            icon: Eraser,
            link: '/rbg',
            label: "Remover Fundo",
            before: "/amigos-before.png",
            after: "/amigos-afther.png",
            description: "Remova fundos automaticamente em segundos",
        },
        {
            id: "enhance",
            icon: Sparkles,
            link: '/quality',
            label: "Melhorar Qualidade",
            before: "/quality-before.jpg",
            after: "/quality.webp",
            description: "Transforme imagens de baixa resolução em alta qualidade",
        },
        {
            id: "watermark",
            icon: Wand2,
            link: '/remove-text-img',
            label: "Remover Marca",
            before: "/agua.png",
            after: "/agua-afther.png",
            description: "Elimine marcas d'água preservando a qualidade",
        },
        {
            id: "generate",
            icon: ImagePlus,
            link: '/text-to-img',
            label: "Gerar Imagem",
            before: null,
            after: "/cidade.png",
            description: "Crie imagens incríveis a partir de texto",
        },
    ]

    const currentDemo = demos.find((d) => d.id === activeTab) || demos[0]

    return (
        <section  id='preview' className="py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <Wand2 className="w-4 h-4 text-[#006666]" />
                        <span className="text-sm font-medium">Demonstração Ao Vivo</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Veja a <span className="text-primary">Mágica</span> em Ação
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Transforme suas imagens em segundos com o poder da inteligência artificial
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
                    <TabsList className="grid grid-cols-2 border-white md:grid-cols-4 w-full mb-6 h-auto gap-2 bg-transparent">
                        {demos.map((demo) => (
                            <TabsTrigger
                                key={demo.id}
                                value={demo.id}
                                className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-[#006666] data-[state=active]:text-primary-foreground rounded-lg border-2 border-white data-[state=active]:border-white transition-all"
                            >
                                <demo.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{demo.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    

                    {demos.map((demo) => (
                        <TabsContent key={demo.id} value={demo.id} className="mt-0">
                            <div className="text-center space-y-4 mb-15">
                                    <p className="text-lg text-muted-foreground">{demo.description}</p>
                                    <Link href={demo.link} className="gap-2 rounded-lg text-white font-black px-3 py-2 bg-[#006666] hover:bg-[#006666]">
                                        Experimentar agora
                                    </Link>
                                </div>
                            <Card className="p-8 bg-card/50 backdrop-blur border-2">
                                <div className={`${demo.before === null ? 'md:grid-cols-1' : 'md:grid-cols-2'} grid  gap-8 items-center `}>
                                    {demo.before && (
                                        <div className="space-y-4">
                                            <div className="text-center mb-2">
                                                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                                    Antes
                                                </span>
                                            </div>
                                            <div className="relative rounded-lg overflow-hidden border-2 border-border bg-muted/20 flex justify-center">
                                                <Image
                                                    src={demo.before || "/placeholder.svg"}
                                                    alt="Imagem depois"
                                                    width={400}
                                                    height={400}
                                                    className="min-h-[400px] max-h-[400px] object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="text-center mb-2">
                                            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                                                {demo.before ? "Depois" : "Resultado: cidade futurista à noite"}
                                            </span>
                                        </div>
                                        <div className={`${demo.label.includes('Remover Fundo') && 'bg-banner' } relative rounded-lg overflow-hidden border-2 border-border bg-muted/20 flex justify-center`}>
                                            <Image
                                                src={demo.after || "/placeholder.svg"}
                                                alt="Imagem depois"
                                                width={400}
                                                height={400}
                                                className="min-h-[400px] max-h-[400px] object-cover"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                                                    <Sparkles className="w-3 h-3" />
                                                    IA
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
