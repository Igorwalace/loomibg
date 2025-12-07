'use client'
import React, { useEffect } from 'react'
import useAppUtils from '../context/utils'

function Loading() {

    const { loading } = useAppUtils()

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [loading]);

    return (
        <>
            {
                loading
                &&
                <div className="pointer-events-none fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
                    <span className="loader2"></span>
                </div>
            }
        </>
    )
}

export default Loading