'use client'
import { CheckCircle2, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '../pages/header'
import { Footer } from '../home/footer'
import useAppPlanActive from '../context/planActive'
import UserCurrent from '../active/user-current'

export default function PagamentoConcluido() {

    UserCurrent()

    const { invoiceUrl } = useAppPlanActive()

    return (
        <div>
            <Header />
            <div className="py-10 bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Success Icon and Message */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6 animate-scale-in">
                            <CheckCircle2 className="w-12 h-12 text-success" strokeWidth={2} />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                            Pagamento Concluído! Agora você é Premium
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
                            Sua transação foi processada com sucesso. Você tem acesso a todas as funcionalidades do Loomibg. Você receberá um email de confirmação em breve.
                        </p>
                    </div>

                    {/* Order Details Card */}
                    {/* <Card className="mb-6 animate-slide-up">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-border">
                                    <h2 className="text-sm font-medium text-muted-foreground">
                                        Número do Pedido
                                    </h2>
                                    <p className="text-base font-semibold text-foreground">
                                        #ORD-2024-{Math.floor(Math.random() * 10000)}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-border">
                                    <h2 className="text-sm font-medium text-muted-foreground">
                                        Data do Pagamento
                                    </h2>
                                    <p className="text-base font-semibold text-foreground">
                                        {new Date().toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-border">
                                    <h2 className="text-sm font-medium text-muted-foreground">
                                        Forma de Pagamento
                                    </h2>
                                    <p className="text-base font-semibold text-foreground">
                                        Cartão de Crédito
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <h2 className="text-lg font-medium text-foreground">
                                        Valor Total
                                    </h2>
                                    <p className="text-2xl font-bold text-success">
                                        R$ 19,90
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* Info Cards */}
                    {/* <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <Card className="bg-accent/50 border-accent">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Confirmação por Email
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-pretty">
                                            Enviamos todos os detalhes do seu pedido para o seu email
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-accent/50 border-accent">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Download className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Recibo Disponível
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-pretty">
                                            Baixe o recibo detalhado da sua compra quando quiser
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild className="flex-1 p-2 bg-[#006666] hover:bg-[#006666] hover:scale-[1.02] duration-200" size="lg">
                            <Link href="/manage-plan" className="inline-flex items-center justify-center gap-2">
                                Gerenciar Plano
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="flex-1 p-2">
                            <Link target='_blank' href={invoiceUrl || '/manage-plan'} className="inline-flex items-center justify-center gap-2">
                                <Download className="w-4 h-4 mr-2" />
                                Baixar Fatura
                            </Link>
                        </Button>
                    </div>

                    {/* Footer*/}
                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Precisa de ajuda? Entre em contato com nosso{' '}
                        <Link target='_blank' href="mailto:loomibg@gmail.com" className="text-primary hover:underline font-medium">
                            suporte ao cliente
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
