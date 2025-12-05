import { NextResponse } from "next/server";
import { databases } from "@/app/utils/appwrite";
import * as jose from "jose";
import { databaseId, tableId } from "@/app/utils/ts";

const GOOGLE_CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Sem token" }, { status: 401 });
        }

        const token = authHeader.replace("Bearer ", "");

        // 1. Buscar as chaves públicas do Firebase
        const certs = await fetch(GOOGLE_CERTS_URL).then((r) => r.json());

        let decoded: any = null;
        let verified = false;

        // 2. Testar cada chave até achar a correta
        for (const key of Object.values(certs)) {
            try {
                decoded = await jose.jwtVerify(token, await jose.importX509(key as string, "RS256"), {
                    issuer: `https://securetoken.google.com/loomibg`,
                    audience: 'loomibg',
                });
                verified = true;
                break;
            } catch (_) { }
        }

        if (!verified) {
            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        const uid = decoded.payload.user_id;

        const userDoc = await databases.getRow({
            databaseId: databaseId!,
            tableId: tableId!,
            rowId: uid
        });

        const credits = userDoc.credit ?? 0;

        if (credits <= 0) {
            return NextResponse.json({ error: "Sem créditos" }, { status: 403 });
        }

        const creditCurrent = credits - 1

        // 4. Descontar crédito
        await databases.updateRow({
            databaseId: databaseId!,
            tableId: tableId!,
            rowId: uid,
            data: {
                credit: creditCurrent
            }
        })

        return NextResponse.json({
            ok: true,
            remaining: creditCurrent,
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
