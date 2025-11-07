import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ShowcaseSection() {
    return (
        <section id="showcase" className="bg-[#020817] py-20 md:py-32 rounded-xl">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-balance text-4xl font-bold text-white md:text-5xl">Veja a magia em ação</h2>
                    <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                        Da fotografia de produtos à arte criativa, veja o que é possível com ferramentas de imagem com inteligência artificial.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 justify-items-center">
                    <Card className="overflow-hidden border-1 border-dashed border-muted-foreground flex items-center justify-center bg-[#0A1222] px-6 max-w-[90%]">
                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 max-w-[350px] h-[350px] rounded-xl">
                            <img
                                src="/cadeira.png"
                                alt="Background removal example"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <Separator className="bg-muted-foreground" />
                        <div className="py-3">
                            <h3 className="mb-2 text-xl font-semibold text-white">Remoção de fundo</h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Perfeito para fotos de produtos de e-commerce. Remova fundos que distraem e crie anúncios profissionais em segundos.
                            </p>
                        </div>
                    </Card>

                    <Card className="overflow-hidden border-1 border-dashed border-muted-foreground flex items-center justify-center bg-[#0A1222] px-6 max-w-[90%]">
                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 max-w-[350px] h-[350px] rounded-xl">
                            <img
                                src="/cachorro-na-lua.png"
                                alt="Text to imagem exemple"
                                className="h-full w-full object-cover rounded-xl"
                            />
                        </div>
                        <Separator className="bg-muted-foreground" />
                        <div className="py-3">
                            <h3 className="mb-2 text-xl font-semibold text-white">Texto para imagens</h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Gere visuais únicos a partir de descrições simples. Perfeito para mídias sociais, marketing e projetos criativos.
                            </p>
                        </div>
                    </Card>
                </div>

            </div>
        </section>
    )
}
