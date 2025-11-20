'use client'
import React from 'react'
import useAppUtils from '../context/utils'

function Loading() {

    const { loading } = useAppUtils()

    return (
        <>
            {
                loading
                &&
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
                    <span className="loader2"></span>
                </div>
            }
        </>
    )
}

export default Loading