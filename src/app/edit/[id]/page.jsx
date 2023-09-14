'use client'
import { useRouter } from 'next/navigation'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FormProduct from '../../../components/FormProduct'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import Image from 'next/image'

const loadProduct = async (id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, { headers: {'Authorization': `Bearer ${token}`}})
        console.log(response)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const page = async ({ params }) => {
    const { token, auth } = useContext(UserContext)
    const router = useRouter()

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
        <div className='max-w-7xl bg-slate-100 mx-auto py-5 flex items-center justify-center gap-10 w-full'>
            <FormProduct producto={producto} params={params} />
        </div>
    )
}

export default page