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
            const data = await response.json()
            if(!data.token) return console.log('Error en el servidor')
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setAuth(true)
            setIsLoadingFetch(false)
            router.push('/home')
        } catch (error) {
            console.log(error)
            setIsLoadingFetch(false)
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
                color="rgb(29 78 216)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff"
                strokeWidth={5}
                strokeWidthSecondary={5}/>
            </div>
        )
    }

    return (
        <form className='flex flex-col items-center justify-center gap-7'>
            <h1 className='text-5xl font-bold text-blue-700 uppercase text-center py-2 border-t-2 border-b-2'>Login</h1>
            <input 
            type="text" 
            placeholder='Email' 
            value={values.email} 
            onChange={(e) => setValues({...values, email: e.target.value})}
            className='p-4 rounded-3xl outline-none' />
            <input 
            type="password" 
            placeholder='Password' 
            value={values.password} 
            onChange={(e) => setValues({...values, password: e.target.value})}
            className='p-4 rounded-3xl outline-none' />
            <button 
            className='flex items-center justify-center bg-blue-600 text-white uppercase font-bold p-4 rounded-3xl w-[85%] hover:bg-blue-700' onClick={(e) => onSubmit(e)}>
                {
                    isLoadingFetch ?
                    <Oval
                    height={25}
                    width={25}
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
            <Image 
            src='/logo-menu-1.png' 
            alt='Image' 
            width={320} 
            height={320} />
        </form>
    )
}

export default FormLogin