'use client'
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';

const ModalAddPrice = () => {
    const { setToken , openModalLogout, setOpenModalLogout, setAuth } = useContext(UserContext)
    const router = useRouter()
    if (!openModalLogout) return null;

    const close = () => {
        setOpenModalLogout(false)
    }

    const onAccept = () => {
        localStorage.removeItem('token')
        setAuth(false)
        setOpenModalLogout(false)
        setToken(null)
        router.push('/')
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center border-2 border-gray-300 justify-center gap-6 bg-white w-96 p-5 h-[200px] rounded-lg shadow-md">
                <h3 className='text-2xl text-center font-semibold'> ¿Estas seguro que deseas cerrar tu sesión? </h3>
                <div className='flex items-center justify-center gap-4'>
                    <button className='bg-blue-600 flex items-center justify-center text-lg text-white w-[120px] py-2 px-3 rounded-lg hover:bg-blue-800' onClick={() => onAccept()}>
                        Aceptar
                    </button>
                    <button className='bg-blue-600 text-white w-[120px] text-lg py-2 px-3 rounded-lg hover:bg-blue-800' onClick={() => close()}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAddPrice