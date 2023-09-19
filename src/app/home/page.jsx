/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useContext, useEffect, useState } from "react"
import ProductInfo from "../../components/ProductInfo"
import { UserContext } from "../../context/UserContext"
import { useRouter } from 'next/navigation'
import Modal from "../../components/Modal"
import Image from "next/image"
import { ToastContainer } from "react-toastify"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const loadProducts = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, { headers: { 'Authorization': `Bearer ${token}`} })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const HomePage = () => {
    const router = useRouter()
    const { token, auth } = useContext(UserContext)

    useEffect(() => {
        if(!auth) {
            router.push('/')
        }
    }, [])
    
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [limit, setLimit] = useState(8)
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [showTotalCost, setShowTotalCost] = useState(false);
    const [page, setPage] = useState(1);

    const openModal = (productId) => {
        setDeleteProductId(productId);
        setIsModalOpen(true);
    };

    const closeModal = async () => {
        setDeleteProductId(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        if (deleteProductId) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${deleteProductId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                getproducts();
            } catch (error) {
                console.log(error);
            }
            closeModal();
        }
    };
    
    const getproducts = async () => {
        const response = await loadProducts(token)
        setProducts(response)
        setFilteredProducts(response)
        setTotalCost(response.reduce((acc, product) => acc + (Number(product.costo) * Number(product.stock)), 0))
    }

    useEffect(() => {
        getproducts()
    }, [])

    useEffect(() => {
        if(search === '') {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(producto => producto.product.toLowerCase().includes(search.toLowerCase())))
        }
    }
    , [search])

    if(!auth) {
        return (
            <div className='flex flex-col items-center justify-center gap-7 h-[90vh]'>
                <Image
                src='/logo-menu-1.png' 
                alt='Image' 
                width={520} 
                height={520} />
            </div>
        )
    }

    return (
    <div className='max-w-7xl bg-slate-100 mx-auto py-5 flex flex-col items-center justify-center gap-6 w-full'>
        <div className='flex items-center justify-center gap-5 w-full'>
            <input 
            type="text" 
            placeholder='Nombre producto ...' 
            className='border-2 border-gray-400 text-xl p-2 rounded-3xl w-[350px] text-center'
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())} />
        </div>
        <div className='flex flex-col items-center gap-5 w-full'>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <p className="text-xl font-medium">Total productos:</p>
                    <p className="text-xl font-semibold">{ filteredProducts.length }</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-medium"> Valor total mercaderia:  </p>
                    <p className="text-xl font-semibold cursor-pointer hover:bg-slate-200 p-2" onClick={() => setShowTotalCost(!showTotalCost)}> $ { showTotalCost ? Math.round(totalCost).toLocaleString() : '**********' } </p>
                </div>
            </div>
            <div className='flex flex-row items-center bg-blue-100 justify-center gap-32 border-b-4 border-t-4 border-blue-200 w-full p-2'>
                <p className='text-lg font-semibold w-[235px] overflow-x-hidden'> Producto </p>
                <p className='text-lg font-semibold w-[20px] text-center'> Stock </p>
                <p className='text-lg font-semibold text-center w-[100px]'> Precio Costo </p>
                <p className='text-lg font-semibold text-center w-[100px]'> Precio Venta  </p>
                <p className='text-lg font-semibold text-center w-[120px]'> Precio Con IVA </p>
                <p className='text-lg font-semibold w-[120px]'> Actions </p>
            </div>
        <div className='flex flex-col items-center justify-center gap-2 w-full'>
        {
            filteredProducts.slice((limit - 8), limit).map((product, index) => (
            <ProductInfo key={index} {...product} openModal={() => openModal(product._id)} />
            ))
        }
        </div>
        <div className='flex items-center justify-center gap-5'>
            <button 
            className='bg-blue-600 text-2xl font-bold text-white py-2 px-5 rounded-lg disabled:bg-gray-400 hover:bg-blue-800' 
            disabled={limit === 8} 
            onClick={() => { 
                setLimit(limit - 8)
                setPage(prev => prev - 1)
            }}>
                <FaArrowLeft size={35} />
            </button>
            <p className="text-5xl font-bold opacity-80"> { page } </p>
            <button 
            className='bg-blue-600 text-2xl font-bold text-white py-2 px-5 rounded-lg disabled:bg-gray-400 hover:bg-blue-800 ' 
            disabled={limit >= filteredProducts.length} 
            onClick={() => { 
                setLimit(limit + 8)
                setPage(prev => prev + 1)
            }}>
                <FaArrowRight size={35} />
            </button>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} productId={deleteProductId} />
        <ToastContainer />
    </div>
    )
}

export default HomePage