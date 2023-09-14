'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') || null : null)
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(!storedToken){
            setAuth(false);
            setToken(null);
            router.push('/')
            return;
        }
        setToken(storedToken);
        setAuth(true);
        router.push('/home')
    }, []);

    return (
        <UserContext.Provider value={{ auth, setAuth, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;