import { ArrowRight, Download, Upload, Zap } from 'lucide-react'
import React from 'react'

function ImageUpscaling() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 md:p-8 selection:bg-blue-100">
            <div className="w-full max-w-5xl mx-auto space-y-12">
                {/* Header Content */}
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm text-slate-600 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        AI Upscaler 2.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 pb-2">Melhore a qualidade suas fotos.</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Faça o upload de imagens de baixa resolução e veja-as se transformarem instantaneamente usando tecnologia avançada de ampliação por IA.
                    </p>
                </div>

                {/* Main Interaction Area */}
                <div className="w-full relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xl shadow-slate-200/50">

                        <div>
                            <div className="flex flex-col items-center gap-6 p-8 text-center">
                                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center ring-1 ring-slate-200">
                                    <Upload className="h-10 w-10 text-slate-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-slate-900">Upload de sua imagem</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">
                                        Arraste e solte seu arquivo aqui ou clique para procurar arquivos.
                                    </p>
                                </div>
                                <label className="relative cursor-pointer">
                                    <input type="file" className="hidden" accept="image/*" />
                                    <span className="inline-flex h-12 items-center justify-center rounded-lg bg-slate-900 px-8 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                                        Selecionar arquivos
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col h-full">
                            {/* Toolbar */}
                            <div className="h-16 border-b border-slate-200 flex items-center justify-center md:justify-end px-6 bg-white/80 backdrop-blur gap-4">
                                <div className="flex gap-2">
                                    <button
                                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-slate-800 transition shadow-sm"
                                    >
                                        <Zap className="h-4 w-4" />
                                        Melhorar Image
                                    </button>
                                    {/* <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-slate-800 transition shadow-sm">
                                        <Download className="h-4 w-4" />
                                        Download
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ImageUpscaling