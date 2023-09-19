'use client'
import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { UserContext } from '../context/UserContext';

const ButtonLogout = () => {
    const { setOpenModalLogout } = useContext(UserContext)
    const pathname = usePathname();

    if(pathname === '/'){
        return null;
    }

    return (
        <button
            className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg"
            onClick={() => setOpenModalLogout(true)}
        >
            <FiLogOut className="text-3xl" />
        </button>
    );
};

export default ButtonLogout;