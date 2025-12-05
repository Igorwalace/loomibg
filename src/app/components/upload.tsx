'use client'
import React, { useState } from 'react'
import { storage } from '../utils/appwrite'
import { ID } from 'appwrite'

export const BUCKET_ID_IMAGE = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGE

function Upload() {

    const [file, setFile] = useState<File | undefined>(undefined)

    if (!BUCKET_ID_IMAGE) return

    const UploadFile = async () => {
        try {
            if (file === undefined) return
            const promise = await storage.createFile(
                BUCKET_ID_IMAGE,
                ID.unique(),
                file
            );
            console.log(promise)
        } catch (error) {
            console.log(error)
        }
    }

    const GetFileDownload = async () => {
        try {
            const GetFile = await storage.getFileView(BUCKET_ID_IMAGE, '68b45258000541de3993')
            console.log(GetFile)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex items-center justify-center gap-10' >
                <input
                    type='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button onClick={UploadFile} >ENVIAR ARQUIVO</button>
                <button onClick={GetFileDownload} >BAIXAR ARQUIVO</button>
            </div>
        </>
    )
}

export default Upload