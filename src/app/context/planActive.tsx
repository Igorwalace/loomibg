'use client'

//next-react
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../utils/firebase";
import { databases } from "../utils/appwrite";
import { Query } from "appwrite";
import { onAuthStateChanged, User } from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function PlanActive({ children }: {
    children: React.ReactNode;
}) {
    const [planCurrent, setPlanCurrent] = useState('')
    const [credit, setCredit] = useState(0)
    const [invoiceUrl, setInvoiceUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const [veri, setVeri] = useState(false)

    const [userCurrent, setUserCurrent] = useState<User | null>(null)

    const user = auth.currentUser

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const GETDatabase = async () => {
                try {
                    setLoading(true)

                    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
                    const tableId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID

                    setUserCurrent(user)
                    console.log('User current: ' + userCurrent)

                    if (!databaseId || !tableId || !user) {
                        console.log('Não foi possivel encontrar variáveis de ambiente necessarias.')
                        return
                    }
                    const promise = await databases.listRows({
                        databaseId,
                        tableId,
                        queries: [
                            Query.equal("$id", user.uid)
                        ]
                    });

                    const planUser = promise.rows[0]?.planActive
                    const receipt = promise.rows[0]?.Receipt
                    const creditos = promise.rows[0].credit

                    if (planUser === undefined || planUser === null) {
                        setPlanCurrent('NOPremium')
                        return
                    }
                    if (!receipt) {
                        setInvoiceUrl('/')
                    }

                    setInvoiceUrl(receipt)
                    setPlanCurrent(planUser)
                    setCredit(creditos)
                } catch (error) {

                } finally {
                    setLoading(false)
                }
            }
            GETDatabase()
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, [user, veri])

    function resetPlanActive() {
        setPlanCurrent('');
        setInvoiceUrl('');
        setCredit(0);
        setUserCurrent(null)
    }

    return (
        <AppContext.Provider value={{
            planCurrent, setPlanCurrent, invoiceUrl, setInvoiceUrl, resetPlanActive, credit, setCredit, userCurrent, loading, veri, setVeri
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppPlanActive() {
    return useContext(AppContext)
}