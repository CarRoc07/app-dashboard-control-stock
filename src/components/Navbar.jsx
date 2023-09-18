'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ModalAddPrice from './ModalAddPrice'

const ACTIONS = {
    ADD: "add",
    SUB: "sub"
}

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false)
    const [action, setAction] = useState(ACTIONS.ADD)
    const router = useRouter()

    const setModalInfo = (action) => {
        setAction(action)
        setOpenModal(true)
    }

    return (
        <div className='bg-blue-300 w-full' >
            <nav className='flex flex-row max-w-7xl mx-auto py-3 px-5 items-center justify-around'>
                <Image width={200} height={60} className='cursor-pointer' onClick={() => router.push('/home')} src="/logo-menu-1.png" alt="Logo" />
                <div className='flex items-center justify-center flex-row gap-5'>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800' onClick={() => router.push('/add')}>
                        Añadir producto
                    </button>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800' onClick={() => setModalInfo(ACTIONS.ADD)}>
                        Sumar a todos
                    </button>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800' onClick={() => setModalInfo(ACTIONS.SUB)}>
                        Restar a todos
                    </button>
                </div>
            </nav>
            <ModalAddPrice isOpen={openModal} action={action} close={() => setOpenModal(false)} />
        </div>
        
    )
}

export default Navbar