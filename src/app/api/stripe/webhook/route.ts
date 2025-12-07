import { databases, } from "@/app/utils/appwrite";
import { databaseId, secret, tableId, webhookSecret } from "@/app/utils/ts";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
    if (!databaseId || !tableId) {
        return NextResponse.json(
            { error: "Erro: Não foi possível encontrar database ou table." },
            { status: 500 }
        );
    }

    if (!secret || !webhookSecret) {
        console.error("Stripe keys missing");
        return NextResponse.json({ error: "Missing keys" }, { status: 500 });
    }

    const buf = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        console.error("Missing signature header");
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const stripe = new Stripe(secret, {
        apiVersion: "2025-10-29.clover",
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (erro) {
        console.error("Webhook signature error:");
        return NextResponse.json({ error: `Webhook Error:` }, { status: 400 });
    }

    console.log("WEBHOOK RECEIVED:" + event.id);

    // --- EVENTOS ---
    // --- EVENTOS ---
    switch (event.type) {

        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            if (session.payment_status !== "paid") {
                console.log("Pagamento não confirmado, ignorando.");
                break;
            }

            const authUserId = session.metadata?.authUserId;

            if (!authUserId) {
                throw new Error('Sem usuário.')
            }

            console.log("COMPRA REALIZADA por:", authUserId);

            const invoiceId = session.invoice as string;
            let invoiceUrl = null;

            if (invoiceId) {
                const invoice = await stripe.invoices.retrieve(invoiceId);
                invoiceUrl = invoice.invoice_pdf;
            }

            const row = await databases.getRow({
                databaseId,
                tableId,
                rowId: authUserId
            });

            const currentCredits = row.credit ?? 0;

            const creditosNew = currentCredits + 5;

            console.log('Seus créditos creditsToAdd:' + creditosNew)

            await databases.updateRow({
                databaseId,
                tableId,
                rowId: authUserId!,
                data: {
                    planActive: "Premium",
                    credit: creditosNew,
                    Receipt: invoiceUrl
                }
            })

            break;
        }

        // só pra logar caso queira
        case "invoice.paid": {
            const invoice = event.data.object as Stripe.Invoice;
            console.log("INVOICE paga:", invoice.id);
            break;
        }
    }

    return NextResponse.json({ received: true });
}