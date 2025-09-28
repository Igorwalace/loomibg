'use client'
import React, { useEffect, useState } from 'react'
import { storage } from '@/app/utils/appwrite';
import { auth } from '../utils/firebase';
import { BUCKET_ID_IMAGE } from '../components/upload';
import { Models } from 'appwrite';
import Image from 'next/image';

function ListFiles() {

    const [files, setFiles] = useState<Models.File[] | null>(null);
    const [user, setUser] = useState(auth.currentUser)
    const [imagesUser, setImagesUser] = useState<string[]>([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const ObterFile = async () => {
            const result = await storage.listFiles(BUCKET_ID_IMAGE!);
            const resultUser = result.files.filter((file) => (file.name.includes(user?.uid!)))
            setFiles(resultUser)

            const urls = resultUser.map((result) => (
                storage.getFileView(BUCKET_ID_IMAGE!, result.$id)
            ))
            setImagesUser(urls)
            console.log(urls)
        }
        ObterFile()
    }, [user])

    return (
        <div className='grid lg:grid-cols-9 grid-cols-3 gap-3 lg:p-5 px-4' >
            {
                imagesUser.map((image) => (
                    <div key={image} className=' rounded-2xl hover:scale-[1.02] cursor-pointer duration-200' >
                        <Image
                            className='rounded-2xl object-cover border-2 border-[#dfdfdf]'
                            width={200}
                            height={200}
                            src={image}
                            alt=''
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default ListFiles