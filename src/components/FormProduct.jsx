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
        <form className='flex flex-col gap-10 bg-blue-600 p-8 rounded-xl w-[400px] shadow-3xl'>
            <h1 className='text-2xl font-bold uppercase text-white text-center py-2 border-t-2 border-b-2'>{params ? 'Editar Producto' : 'Crear Producto'}</h1>
            <input className='p-4 rounded-3xl outline-none' type="text" placeholder='Producto' value={values.product} onChange={(e) => setValues({...values, product: e.target.value})} />
            <input className='p-4 rounded-3xl outline-none' type="number" placeholder='Stock' value={values.stock} onChange={(e) => setValues({...values, stock: Number(e.target.value)})} />
            <input className='p-4 rounded-3xl outline-none' type="number" placeholder='Precio costo' value={values.costo} onChange={(e) => setValues({...values, costo: Number(e.target.value)})} />
            <button className='flex items-center justify-center p-4 rounded-3xl bg-slate-100 text-xl text-blue-800 uppercase font-bold hover:bg-slate-300 transition-all duration-300' onClick={(e) => onSubmit(e)}>
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