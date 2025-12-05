'use client'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog'
import React from 'react'
import useAppUtils from '../context/utils'

function DialogLogin() {

    const { dialogNoLogin, setDialogNoLogin, SignIn } = useAppUtils()

    return (
        <>
            <AlertDialog onOpenChange={setDialogNoLogin} open={dialogNoLogin} >
                <AlertDialogContent className='lg:w-2/6 w-5/6' >
                    <AlertDialogHeader className='text-left' >
                        <AlertDialogTitle>Ops! Você ainda não está logado.</AlertDialogTitle>
                        <AlertDialogDescription>
                            Conecte-se rapidinho para continuar.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='hover:scale-[1.02]' >Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={SignIn}
                            className='bg-[#006666] hover:bg-[#0006666] hover:scale-[1.02] '
                        >Fazer login</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DialogLogin