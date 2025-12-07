import React from 'react'
import Header from '../pages/header'
import { Footer } from '../home/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CreditCard, HelpCircle, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Error() {
    return (
        <div>
            <Header />
            <div className="bg-background flex flex-col">

                {/* Main Content */}
                <main className="flex-1 container mx-auto px-4 py-10 md:py-10 flex items-center justify-center">
                    <div className="max-w-2xl w-full">
                        {/* Error Icon and Main Message */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center size-20 rounded-full bg-error/10 mb-6">
                                <AlertCircle className="size-10 text-error" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                                Ops! Não foi possível processar seu pagamento
                            </h1>
                            <p className="text-lg text-muted-foreground text-pretty">
                                Não se preocupe, nenhuma cobrança foi realizada. Por favor, verifique as informações abaixo e tente novamente.
                            </p>
                        </div>

                        {/* Error Details Card */}
                        <Card className="mb-6 border-error/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Detalhes do Erro</CardTitle>
                                <CardDescription>Código de referência: Não identificado</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-error/5">
                                    <AlertCircle className="size-5 text-error mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground mb-1">Motivo não identificado.</p>
                                        <p className="text-sm text-muted-foreground">
                                            Tente novamente ou entre em contato com o suporte.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                        <RefreshCcw className="size-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-base">Tentar Novamente</CardTitle>
                                    <CardDescription className="text-pretty">
                                        Use o mesmo cartão ou tente com outro método de pagamento
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                                <CardHeader>
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                        <CreditCard className="size-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-base">Outro Cartão</CardTitle>
                                    <CardDescription className="text-pretty">
                                        Adicione um novo método de pagamento para finalizar sua compra
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        {/* Help Section */}
                        <Card className="bg-muted/30">
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <HelpCircle className="size-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-base mb-2">Precisa de ajuda?</CardTitle>
                                        <CardDescription className="text-pretty mb-3">
                                            Se o problema persistir, entre em contato com nosso suporte.
                                        </CardDescription>
                                        <div className="flex flex-wrap gap-2">
                                            <Link target='_blank' href="mailto:loomibg@gmail.com" className="text-primary hover:underline font-medium">
                                                <Button variant="link" className="h-auto p-0 text-primary">
                                                    Falar com Suporte →
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8">
                    <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                        <p>Seus dados estão seguros e protegidos. Todas as transações são criptografadas.</p>
                    </div>
                </footer>
            </div>
            <Footer />
        </div>
    )
}

export default Error