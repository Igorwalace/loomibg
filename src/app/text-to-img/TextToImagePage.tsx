import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";

export default function TextToImagePage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                        <Sparkles className="w-8 h-8 text-[#006666]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Crie Imagens a partir de Qualquer Frase</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Transforme suas palavras em imagens impressionantes.
                    </p>
                </div>

                <div className=" lg:grid-cols-2 gap-4">
                    {/* Input Section */}
                    <Card className="p-4 space-y-1">
                        <div className="space-y-2">
                            <label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-[#006666]" />
                                Descreva sua imagem
                            </label>
                            <textarea
                                id="prompt"
                                placeholder="Um cachorro na praia de bermuda."
                                // value={prompt}
                                // onChange={(e) => setPrompt(e.target.value)}
                                className="min-h-[200px] w-full rounded-2xl resize-none p-3 border-2 border-dashed border-border bg-muted/30"
                            // disabled={isGenerating}
                            />
                            <p className="text-xs text-muted-foreground">Seja específico e descritivo para obter melhores resultados.</p>
                        </div>

                        {/* {error && (
                            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )} */}

                        <Button
                            className="w-full h-12 font-black text-base bg-[#006666] hover:bg-[#006666] hover:scale-[1.01] text-primary-foreground"
                            size="lg"
                        >
                            Gerar imagem
                        </Button>

                        {/* Example Prompts */}
                        <div className="pt-4 border-t space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Experimente estes exemplos:</p>
                            <div className="flex flex-wrap gap-2">
                                {["Uma cidade futurista à noite", "Robô fofo lendo um livro", "Padrão geométrico abstrato"].map(
                                    (example) => (
                                        <button
                                            key={example}
                                            // onClick={() => setPrompt(example)}
                                            // disabled={isGenerating}
                                            className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors disabled:opacity-50"
                                        >
                                            {example}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Output Section */}
                    <Card className="p-6 hidden">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Imagem Gerada</label>
                                {/* {generatedImage && (
                                    <Button onClick={handleDownload} variant="outline" size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                )} */}
                            </div>

                            <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-full rounded-2xl bg-white">
                                    <Image
                                        className={`rounded-2xl object-contain p-1`}
                                        src={"https://tor.cloud.appwrite.io/v1/storage/buckets/69069613000fe50c3955/files/690c03f6003b68d2d978/view?project=69069541002417c94a88"}
                                        fill
                                        // onLoad={(e) => {
                                        //     const img = e.currentTarget
                                        //     img.style.opacity = '1'
                                        // }}
                                        alt="A sua nova imagem gerada por nossa IA."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
