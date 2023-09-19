'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import Image from 'next/image.js'
import { Oval } from "react-loader-spinner"
import { useRouter } from 'next/navigation'

const FormLogin = () => {
    const { setAuth, setToken } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const [errors, setErrors] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()

        if(values.email.length === 0 || values.password.length === 0) {
            alert('Ingrese todos los datos')
            return
        }

        setIsLoadingFetch(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log(response)
            if(response.status !== 200 && response.status !== 204) {
                setErrors(true)
                setIsLoadingFetch(false)
                return
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setAuth(true)
            setIsLoadingFetch(false)
            router.push('/home')
        } catch (error) {
            console.log(error)
            setIsLoadingFetch(false)
            setErrors(true)
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    
        return () => clearTimeout(timeoutId);
    }, []);

    if(isLoading) {
        return (
            <div className='flex flex-col items-center justify-center gap-7'>
                <Image 
                src='/logo-menu-1.png' 
                alt='Image' 
                width={520} 
                height={520} />
                <Oval
                height={50}
                width={50}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="rgb(37 99 235)"
                strokeWidth={5}
                strokeWidthSecondary={5}/>
            </div>
        )
    }

    return (
        <form className='flex flex-col items-center rounded-br-xl rounded-tl-xl justify-center p-8 shadow-xl gap-7 bg-slate-50'>
            <h1 className='text-6xl font-bold text-blue-600 text-center py-2 border-t-2 border-b-2 uppercase'>Accedé</h1>
            <input 
                type="text" 
                placeholder='Email' 
                value={values.email} 
                onChange={(e) => setValues({...values, email: e.target.value})}
                className='p-4 rounded-t-xl border-b-4 bg-slate-100 border-blue-200 font-medium outline-none text-xl w-[300px] focus:border-blue-500' />
            <input 
                type="password" 
                placeholder='Password' 
                value={values.password} 
                onChange={(e) => setValues({...values, password: e.target.value})}
                className='p-4 rounded-t-xl border-b-4 bg-slate-100 border-blue-200 font-medium outline-none text-xl w-[300px] focus:border-blue-500' />
            <div className='flex items-center flex-col gap-3'>
                <button 
                    className='flex items-center text-3xl justify-center bg-blue-500 text-white uppercase font-semibold p-3 transition-all rounded-xl w-[300px] hover:bg-blue-700' onClick={(e) => onSubmit(e)}>
                    {
                        isLoadingFetch ?
                        <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#fff"
                        strokeWidth={4}
                        strokeWidthSecondary={4}/> : 
                        'Ingresar'
                    }
                </button>
                {
                    errors && 
                    <p className='text-red-500 text-center font-medium'>Contraseña o email incorrectos</p>
                }
                <Image 
                    src='/logo-menu-1.png' 
                    alt='Image' 
                    width={400} 
                    height={400} />
            </div>
        </form>
    )
}

export default FormLogin