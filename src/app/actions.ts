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
    metadata: {
      authUserId: userId,
    },
    invoice_creation: {
      enabled: true
    },
    payment_method_types: ["card", "boleto"],
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "http://localhost:3000/error",
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
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