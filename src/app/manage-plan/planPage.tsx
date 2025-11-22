'use client'

import { Check, X } from 'lucide-react'
import useAppPlanActive from '../context/planActive'
import { useButtonStripe } from '../active/button-stripe'
import useAppUtils from '../context/utils'
import UserCurrent from '../active/user-current'

function PlanPage() {

    const { planCurrent, credit } = useAppPlanActive()
    const { loading } = useAppUtils()

    const checkout = useButtonStripe()

    return (
        <div className="bg-background text-foreground font-sans">
            <UserCurrent />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <main className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight mb-2">Planos e preços</h1>
                        <p className="text-muted-foreground">
                            Gerencie seus créditos e detalhes de faturamento. Atualize para obter mais recursos.
                        </p>
                    </div>

                    {/* Current Plan Status */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground mb-1">Plano Atual</div>
                                <div className="text-2xl font-bold">{planCurrent === 'Premium' ? planCurrent : 'Gratuito'}</div>
                            </div>

                            <div className="flex gap-3">
                                <button disabled={loading} onClick={checkout} className="w-full p-2 text-sm font-medium bg-[#006666] text-background rounded-md hover:scale-[1.02] hover:bg-[#006666] duration-200 cursor-pointer">
                                    Comprar créditos
                                </button>
                            </div>
                        </div>

                        {/* Usage Bar */}
                        <div className="mt-8 space-y-2">
                            <div className="flex flex-col md:flex-row gap-3 justify-between text-sm">
                                <span className="font-medium">Créditos usados neste mês</span>
                                <div className='flex gap-2 items-center' >
                                    <p className="text-xs text-muted-foreground">Você usou { } dos seus créditos mensais:</p>
                                    <span className="text-xs text-muted-foreground">
                                        0 / {credit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Available Plans */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Free Plan */}
                        <div className="rounded-lg border border-border bg-card p-6 flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg">Gratuito</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">R$0</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Ideal para projetos e experiências de hobby.</p>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                    <span>1 crédito por mês</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                                    <span>Créditos Limidados</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                                    <span>Acesso a todas as funcionalidades</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                                    <span>Suporte prioritário por e-mail</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pro Plan */}
                        <div className="rounded-lg border border-blue-500/50 bg-card p-6 flex flex-col relative shadow-lg shadow-blue-500/5">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                Recomendado
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg">Créditos</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">R$19,90</span>
                                    <span className="text-muted-foreground"></span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Use todos os créditos como quiser</p>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                    <span>20 créditos</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                    <span>Acesso a todas as funcionalidades</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                    <span>Suporte prioritário por e-mail</span>
                                </li>
                            </ul>
                        </div>

                    </div>


                </main>
            </div>
        </div>
    )
}

export default PlanPage