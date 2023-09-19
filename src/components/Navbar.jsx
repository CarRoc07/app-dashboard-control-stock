'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ModalAddPrice from './ModalAddPrice'
import { AiOutlinePlus } from 'react-icons/ai';
import { usePathname } from 'next/navigation'

const ACTIONS = {
    ADD: "add",
    SUB: "sub"
}

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false)
    const [action, setAction] = useState(ACTIONS.ADD)
    const router = useRouter()
    const pathname = usePathname()

    if(pathname === '/') {
        return null
    }

    const setModalInfo = (action) => {
        setAction(action)
        setOpenModal(true)
    }

    return (
        <div className='bg-blue-300 border-b-2 border-b-gray-200 w-full' >
            <nav className='flex flex-row max-w-7xl mx-auto py-3 px-5 items-center justify-around'>
                <Image width={200} height={60} className='cursor-pointer' onClick={() => router.push('/home')} src="/logo-menu-1.png" alt="Logo" />
                <div className='flex items-center justify-center flex-row gap-5'>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800' onClick={() => router.push('/add')}>
                        <AiOutlinePlus size={25} />
                    </button>
                    <button className='bg-slate-50 text-blue-600 font-bold border-2 border-b-blue-600 py-2 px-4 rounded-lg hover:bg-slate-200' onClick={() => setModalInfo(ACTIONS.ADD)}>
                        Sumar a todos
                    </button>
                    <button className='bg-slate-50 text-blue-600 font-bold border-2 border-b-blue-600  py-2 px-4 rounded-lg hover:bg-slate-200' onClick={() => setModalInfo(ACTIONS.SUB)}>
                        Restar a todos
                    </button>
                </div>
            </nav>
            <ModalAddPrice isOpen={openModal} action={action} close={() => setOpenModal(false)} />
        </div>
        
    )
}

export default Navbar