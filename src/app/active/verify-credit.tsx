import React from 'react'
import { getToken } from '../utils/ts';

async function VerifyCredit() {
    const token = await getToken();
    const check = await fetch("/api/use-credit", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return check
}

export default VerifyCredit