import { loadStripe } from "@stripe/stripe-js";
import CreateCheckoutStripe from "../actions";
import { auth } from "../utils/firebase";

export const handleCheckoutStripe = async () => {
    const user = auth.currentUser;

    if (!user) {
        console.error("Usuário não autenticado.");
        return;
    }

    const response = await CreateCheckoutStripe(user.uid);

    if (!response) throw new Error("Falha ao criar o checkout.");

    if ("error" in response) throw new Error('Error in response')

    const { url } = response;


    if (!url) {
        console.log("Session ID não retornada.")
        return
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error('Stripe public key not found')
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

    if (!stripe) {
        throw new Error('Stripe not found')
    }
    window.location.href = url;
}