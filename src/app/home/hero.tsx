import { Sparkles } from "lucide-react"
import ButtonHeroPreview from "./button-hero-preview"
import ButtonHeroStart from "./button-hero-start"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden rounded-2xl py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl">
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
                        <ButtonHeroStart />
                        <ButtonHeroPreview />
                    </div>
                </div>
            </div>
        </section >
    )
}
