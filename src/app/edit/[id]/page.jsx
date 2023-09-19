'use client'
import { usePathname, useRouter } from 'next/navigation'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FormProduct from '../../../components/FormProduct'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import Image from 'next/image'

const loadProduct = async (id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, { headers: {'Authorization': `Bearer ${token}`}})
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const page = async ({ params }) => {
    const { token, auth } = useContext(UserContext)
    const router = useRouter()
    const pathname = usePathname()

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

    useEffect(() => {
        if(!auth) {
            router.push('/')
            return
        }
    }, [auth])

    const producto = await loadProduct(params.id, token)

    return (
        <div className='bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center h-[calc(100vh-87px)]'>
            <div className='max-w-[1280px] flex flex-col items-center justify-center gap-5'>
                <h1 className='text-4xl font-bold uppercase border-b-2 border-r-2 border-white bg-blue-600 p-3 shadow-md text-white text-center w-[420px] py-2'>{pathname === '/add' ? 'Agregar nuevo producto' : 'Editar producto'}</h1>
                <FormProduct producto={producto} params={params} />
            </div>
        </div>
    )
}

export default page