/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import FormProduct from '../../components/FormProduct'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AddProduct = () => {
    const { auth } = useContext(UserContext);
    const router = useRouter()

    useEffect(() => {
        if(!auth) {
            router.push('/')
        }
    }, [auth])

    if(!auth) {
        return (
            <div className='flex flex-col items-center justify-center gap-7 h-[90vh]'>
                <Image
                src='/logo-menu-1.png' 
                alt='Image' 
                width={520} 
                height={520} />
            </div>
        )
    }

    return (
        <div className='max-w-7xl bg-slate-100 mx-auto py-5 flex items-center justify-center gap-10 w-full'>
            <FormProduct />
        </div>
    )
}

export default AddProduct