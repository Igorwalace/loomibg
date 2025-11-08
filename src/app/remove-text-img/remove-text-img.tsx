import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Upload, X } from 'lucide-react'
import React from 'react'

function RemovetextImg() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Remoção de texto por IA</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Faça o upload de uma imagem e deixe a IA detectar e remover o texto automaticamente, deixando a imagem limpa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Upload Section */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Imagem original</h2>

                            {/* {!selectedImage ? ( */}
                                <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <Upload className="w-12 h-12 text-muted-foreground" />
                                        <div className="text-center">
                                            <p className="text-sm font-medium">Click to upload image</p>
                                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</p>
                                        </div>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" />
                                </label>
                            {/* ) : ( */}
                                <div className="relative">
                                    <img
                                        src={"/cidade.png"}
                                        alt="Original"
                                        className="w-full h-80 object-contain rounded-lg bg-muted"
                                    />
                                    <Button size="icon" variant="destructive" className="absolute top-2 right-2" >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            {/* )} */}

                            {/* {selectedImage && !processedImage && ( */}
                            <Button className="w-full mt-4" size="lg" >

                                {/* <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {"Processing..."}
                                </> */}

                                "Remove Text"

                            </Button>
                            {/* )} */}
                        </Card>

                        {/* Result Section */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Imagem processada</h2>

                            {/* {processedImage ? (
                                <div className="space-y-4">
                                    <img
                                        src={processedImage || "/placeholder.svg"}
                                        alt="Processed"
                                        className="w-full h-80 object-contain rounded-lg bg-muted"
                                    />
                                    <Button className="w-full" size="lg" onClick={handleDownload}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Image
                                    </Button>
                                </div>
                            ) : ( */}
                                <div className="flex items-center justify-center w-full h-80 border-2 border-dashed border-border rounded-lg bg-muted/20">
                                    <p className="text-sm text-muted-foreground">
                                        {/* {isProcessing ? "Processing your image..." : "Processed image will appear here"} */}
                                        Processed image will appear here
                                    </p>
                                </div>
                            {/* )} */}
                        </Card>
                    </div>

                    
                </div>
            </div>
        </main>
    )
}

export default RemovetextImg