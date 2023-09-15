'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') || null : null)
    const router = useRouter()

    const isTokenValid = async (tokenValid) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, { headers: { Authorization: `Bearer ${tokenValid}` } })
            if(response.status === 200){
                setToken(tokenValid);
                setAuth(true);
                router.push('/home')
                return;
            } else {
                setAuth(false);
                setToken(null);
                localStorage.removeItem('token');
                router.push('/')
                return;
            }
        } catch (error) {
            setAuth(false);
            setToken(null);
            localStorage.removeItem('token');
            router.push('/')
            return;
        }
    }

    const mostrarToast = () => {
        toast.success('Producto agregado correctamente', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Tiempo en milisegundos antes de que se cierre automáticamente
        });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(!storedToken){
            setAuth(false);
            setToken(null);
            router.push('/')
            return;
        }
        isTokenValid(storedToken);
    }, []);

    return (
        <UserContext.Provider value={{ auth, setAuth, token, setToken, mostrarToast }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;