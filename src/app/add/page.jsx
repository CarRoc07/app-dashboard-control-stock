/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import FormProduct from '../../components/FormProduct'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const AddProduct = () => {
    const { auth } = useContext(UserContext);
    const router = useRouter()
    const pathname = usePathname()

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
        <div className='bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center h-[calc(100vh-87px)]'>
            <div className='max-w-[1280px] flex flex-col items-center justify-center gap-2'>
                <h1 className='text-4xl font-bold uppercase border-b-2 border-r-2 border-white bg-blue-600 p-3 shadow-md text-white text-center w-[420px] py-2'>{pathname === '/add' ? 'Agregar nuevo producto' : 'Editar producto'}</h1>
                <FormProduct />
            </div>
        </div>
        
    )
}

export default AddProduct