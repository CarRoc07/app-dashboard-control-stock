'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductInfo = ({ _id, product, stock, costo, openModal }) => {
    const router = useRouter()

    return (
        <div className='flex flex-row items-center justify-center gap-32 border-b-2 border-t-2 w-full p-2'>
            <p className='text-lg font-semibold w-[150px] overflow-x-hidden'> { product } </p>
            <p className='text-lg font-semibold w-[20px] text-center'> { stock } </p>
            <p className='text-lg font-semibold text-center w-[100px]'> ${costo} </p>
            <p className='text-lg font-semibold text-center w-[100px]'> ${costo * 1.30}  </p>
            <p className='text-lg font-semibold text-center w-[120px]'> ${ (costo * 1.30) * 1.21 } </p>
            <div className='flex items-center gap-3 w-[120px]'>
                <button className='bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-800' onClick={() => router.push(`/edit/${_id}`)}>Edit</button>
                <button className='bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-800' onClick={() => openModal()}>Delete</button>
            </div>
        </div>
    )
}

export default ProductInfo