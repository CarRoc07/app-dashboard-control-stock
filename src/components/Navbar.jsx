'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()

    return (
        <div className='bg-blue-300 w-full' >
            <nav className='flex flex-row max-w-7xl mx-auto py-3 px-5 items-center justify-around'>
                <Image width={200} height={60} className='cursor-pointer' onClick={() => router.push('/home')} src="/logo-menu-1.png" alt="Logo" />
                <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800' onClick={() => router.push('/add')}>
                    Añadir producto
                </button>
            </nav>
        </div>
        
    )
}

export default Navbar