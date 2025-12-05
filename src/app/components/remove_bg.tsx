'use client'
import Image from 'next/image';
import React, { useState } from 'react'

//appwrite
import { storage } from '../utils/appwrite';
import { ID } from 'appwrite';
import { BUCKET_ID_IMAGE } from './upload';

function Remove_BG() {

    const [file, setFile] = useState<File | undefined>(undefined)
    const [preview, setPreview] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_CLICKDROP_API_KEY
    const CLICKDROP_URL_REMOVE_BG = process.env.NEXT_PUBLIC_CLICKDROP_URL_REMOVE_BG

    if (!API_KEY || !CLICKDROP_URL_REMOVE_BG) return

    const RemoveBG = async () => {
        if (!file) return

        const form = new FormData();
        form.append("image_file", file);

        try {
            const response = await fetch(CLICKDROP_URL_REMOVE_BG, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY,
                },
                body: form,
            })
            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer], { type: "image/png" });

            const newFile = new File([blob], "your-image.png", { type: "image/png" });
            const result = await storage.createFile(
                BUCKET_ID_IMAGE!,
                ID.unique(),
                newFile
            );
            const GetUrlFilePublic = storage.getFileView(BUCKET_ID_IMAGE!, result.$id)
            setPreview(GetUrlFilePublic)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <input
                    type='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button onClick={RemoveBG} >ENVIAR ARQUIVO</button>
                {
                    preview != null &&
                    <>
                        <Image
                            src={preview}
                            alt='new image'
                            width={400}
                            height={400}
                        />
                    </>
                }
            </div>
        </>
    )
}

export default Remove_BG