// appwrite
import { Client, Storage, Account, TablesDB } from "appwrite";

const END_POINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

export const client = new Client()
    .setEndpoint(END_POINT)
    .setProject(PROJECT_ID)

if (typeof window !== "undefined") {
    client
        .setEndpoint(END_POINT)
        .setProject(PROJECT_ID)
}


export const storage = new Storage(client);
export const account = new Account(client);
export const databases = new TablesDB(client);