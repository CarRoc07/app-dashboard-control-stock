'use client'
import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useRouter } from 'next/navigation'
import { Oval } from 'react-loader-spinner'

const FormProduct = ({ producto, params }) => {
    const { token, mostrarToast } = useContext(UserContext);
    const router = useRouter()
    const [isLoadingFetch, setIsLoadingFetch] = useState(false)
    const { product, stock, costo  } = producto || {};

    const [values, setValues] = useState({
        product: product ? product : '',
        stock: stock ? stock : '',
        costo: costo ? costo : ''
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoadingFetch(true)

        try {
            if(params?.id) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(values)
                })
                
                router.push('/home')
                setIsLoadingFetch(false)
                mostrarToast()

                return
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            })
            
            router.push('/home')
            setIsLoadingFetch(false)
            mostrarToast()
            return
        } catch (error) {
            console.log(error)
            setIsLoadingFetch(false)
        }
    }

    return (
        <form className='flex flex-col items-center gap-7 bg-slate-50 p-7 rounded-xl w-[420px] shadow-3xl border-r-8 border-b-8 border-blue-500'>
            <input 
                className='p-4 rounded-t-xl border-b-4 bg-slate-100 border-blue-200 font-medium outline-none text-lg w-[300px] focus:border-blue-500' 
                type="text" 
                placeholder='Producto' 
                value={values.product} 
                onChange={(e) => setValues({...values, product: e.target.value})} />
            <input 
                className='p-4 rounded-t-xl border-b-4 bg-slate-100 border-blue-200 font-medium outline-none text-lg w-[300px] focus:border-blue-500' 
                type="number" 
                placeholder='Stock' 
                value={values.stock} 
                onChange={(e) => setValues({...values, stock: Number(e.target.value)})} />
            <input 
                className='p-4 rounded-t-xl border-b-4 bg-slate-100 border-blue-200 font-medium outline-none text-lg w-[300px] focus:border-blue-500' 
                type="number" 
                placeholder='Precio costo' 
                value={values.costo} 
                onChange={(e) => setValues({...values, costo: Number(e.target.value)})} />
            <button 
                className='flex items-center justify-center border-b-4 w-[220px] border-blue-400 p-4 rounded-3xl shadow-md bg-slate-100 text-xl text-blue-600 uppercase font-bold hover:bg-slate-300 transition-all duration-300' 
                onClick={(e) => onSubmit(e)}>
            {
                    isLoadingFetch ?
                    <Oval
                    height={25}
                    width={25}
                    color="rgb(30 64 175)"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="rgb(96 165 250)"
                    strokeWidth={4}
                    strokeWidthSecondary={4}/> : 
                    'Guardar'
                }
            </button>
        </form>
    )
}

export default FormProduct