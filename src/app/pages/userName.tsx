'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function UserName() {

    const user = auth.currentUser;
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setName(user.displayName)
            }
            else {
                setName(null)
            }
        });
    }, [])

    return (
        <div className='md:hidden rounded-lg cursor-pointer hover:scale-[1.02] duration-200 text-black font-extrabold flex gap-2 items-center justify-center' >
            <Avatar className='border-1 border-white' >
                <AvatarImage src={user?.photoURL || undefined} />
                {
                    name != undefined
                    &&
                    <AvatarFallback className='text-black' >{name.charAt(0) + name.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                }
            </Avatar>
            <div>
                <p className='text-sm text-[#006666] font-extrabold' >{user?.displayName}</p>
            </div>
        </div>
    )
}

export default UserName