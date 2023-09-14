'use client'
import FormProduct from '../../components/FormProduct'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
    const { auth } = useContext(UserContext);
    const router = useRouter()

    if(!auth) {
        router.push('/')
    }
    return (
        <div className='max-w-7xl bg-slate-100 mx-auto py-5 flex items-center justify-center gap-10 w-full'>
            <FormProduct />
        </div>
    )
}

export default AddProduct