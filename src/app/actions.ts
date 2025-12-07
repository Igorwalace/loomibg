// actions.ts (ou onde está seu CreateCheckoutStripe)
"use server";

import Stripe from "stripe";

const CreateCheckoutStripe = async (userId: string) => {

  if (!userId) {
    console.log('No login')
    return
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
  });

  const sessionStripe = await stripe.checkout.sessions.create({
    invoice_creation: {
      enabled: true
    },
    payment_method_types: ["card", "boleto"],
    mode: "payment",
    success_url: process.env.NEXT_PUBLIC_SITE_URL_SUCESS,
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL_CANCEL,
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_PRICE,
        quantity: 1,
      },
    ],
    metadata: {
      authUserId: userId,
    }
  });

  if (!sessionStripe.url) {
    return {
      error: {
        message: "Erro: Não foi possível criar a URL de checkout.",
      },
    };
  }

  return { url: sessionStripe.url };
};

export default CreateCheckoutStripe;