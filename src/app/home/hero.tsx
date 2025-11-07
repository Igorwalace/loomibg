import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden rounded-2xl py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent-foreground">
                        <Sparkles className="h-4 w-4 text-[#006666]" />
                        <span>Com tecnologia avançada de IA</span>
                    </div>

                    <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
                        Transforme imagens com o poder da IA.
                    </h1>

                    <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                        Remova fundos instantaneamente, gere imagens impressionantes a partir de texto e desbloqueie infinitas possibilidades criativas.
                        Ferramentas de nível profissional que funcionam em segundos.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={'/rbg'} className="bg-[#006666] hover:bg-[#006666] h-10 rounded-md px-6 flex items-center justify-center text-primary-foreground hover:scale-[1.01]">
                            Começar gratuitamente
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                            Ver Preview
                        </Button>
                    </div>

                    {/* <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-2 text-3xl font-bold text-foreground">10M+</div>
                            <div className="text-sm text-muted-foreground">Images Processed</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-3xl font-bold text-foreground">500K+</div>
                            <div className="text-sm text-muted-foreground">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-3xl font-bold text-foreground">{"<"}1s</div>
                            <div className="text-sm text-muted-foreground">Processing Time</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-3xl font-bold text-foreground">99.9%</div>
                            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
