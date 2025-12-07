import Stripe from "stripe";
import { auth } from "./firebase";

export const messages = [
    "Removendo fundo...",
    "Estámos trabalhando nisso.",
    "Só um instante.",
    "Quase pronto, segura aí!",
    'Estamos quase lá.',
    'Só mais um toque de magia.',
    'Só mais alguns ajustes.',
    'Cada detalhe conta!',
    'A IA está lapidando sua criação.',
    'Quase, quase, quase'
];

export const phrases = [
    "Sua imagem, criada pela IA.",
    "A IA transforma sua ideia em imagem.",
    "Da sua câmera para a magia da IA.",
    "Tecnologia e arte.",
    "Sua foto ganhando vida"
]

export const API_KEY = process.env.NEXT_PUBLIC_CLICKDROP_API_KEY
export const CLICKDROP_URL_REMOVE_BG = process.env.NEXT_PUBLIC_CLICKDROP_URL_REMOVE_BG
export const CLICKDROP_URL_TEXT_TO_IMAGE = process.env.NEXT_PUBLIC_CLICKDROP_URL_TEXT_TO_IMAGE

export const CLICKDROP_URL_REMOVE_TEXT = process.env.NEXT_PUBLIC_CLICKDROP_URL_REMOVE_TEXT

export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
export const secret = process.env.STRIPE_SECRET_KEY;
export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
export const tableId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID


export const getToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado!");

    return await user.getIdToken();
};


