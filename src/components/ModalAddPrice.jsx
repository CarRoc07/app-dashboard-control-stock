'use client'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { Oval } from 'react-loader-spinner';

const ModalAddPrice = ({ isOpen, action, close }) => {
    const [value, setValue] = useState({
        inputValue: ''
    })
    const [loading, setLoading] = useState(false)
    const { token } = useContext(UserContext)
    if (!isOpen) return null;

    const sendData = async (e) => {
        e.preventDefault()

        const porcentajeDecimal = parseFloat(value.inputValue) / 100;

        const valorFinal = action === 'add' ? 1 + porcentajeDecimal : 1 - porcentajeDecimal;
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/update/${action}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ value: valorFinal })
            })

            if (response.ok) {
                console.log('Solicitud exitosa');
            } else {
                console.error('Error en la solicitud:', response.status);
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setValue({ inputValue: '' });
        }

        close()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-around border-1 border-blue-500 bg-white w-96 p-4 h-[200px] rounded-lg shadow-md">
                <p className='text-lg font-semibold text-center w-[250px] overflow-x-hidden'>
                    Ingrese porcentaje a { action === 'add' ? 'sumar' : 'restar' }
                </p>
                <input type="text" placeholder='Porcentaje..' value={value.inputValue} onChange={(e) => setValue({...value, inputValue: e.target.value})} />
                <div className='flex items-center justify-center gap-3'>
                    <button className='bg-blue-600 flex items-center justify-center text-white w-[120px] py-2 px-3 rounded-lg hover:bg-blue-800' onClick={sendData}>
                    {
                    loading ?
                    <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#444"
                    strokeWidth={2}
                    strokeWidthSecondary={2}/> : 
                    'Aceptar'
                }
                    </button>
                    <button className='bg-blue-600 text-white w-[120px] py-2 px-3 rounded-lg hover:bg-blue-800' onClick={() => close()}>
                    Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAddPrice