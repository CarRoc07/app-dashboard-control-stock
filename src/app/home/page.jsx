/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useContext, useEffect, useState } from "react"
import ProductInfo from "../../components/ProductInfo"
import { UserContext } from "../../context/UserContext"
import { useRouter } from 'next/navigation'
import Modal from "../../components/Modal"

const loadProducts = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, { headers: { 'Authorization': `Bearer ${token}`} })
        console.log(response)
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
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

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

    return (
    <div className='max-w-7xl bg-slate-100 mx-auto py-5 flex flex-col items-center justify-center gap-10 w-full'>
        <div className='flex items-center justify-center gap-5 w-full'>
            <input 
            type="text" 
            placeholder='Nombre producto ...' 
            className='border-2 border-gray-300 p-2 rounded-lg w-[350px] text-center'
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())} />
        </div>
        <div className='flex flex-col items-center gap-5 w-full'>
            <h2 className='text-2xl font-bold uppercase'>Resultados</h2>
            <div className='flex flex-row items-center bg-blue-200 justify-center gap-32 border-b-2 border-t-2 w-full p-2'>
                <p className='text-lg font-semibold w-[150px] overflow-x-hidden'> Producto </p>
                <p className='text-lg font-semibold w-[20px] text-center'> Stock </p>
                <p className='text-lg font-semibold text-center w-[100px]'> Precio Costo </p>
                <p className='text-lg font-semibold text-center w-[100px]'> Precio Venta  </p>
                <p className='text-lg font-semibold text-center w-[120px]'> Precio Con IVA </p>
                <p className='text-lg font-semibold w-[120px]'> Actions </p>
            </div>
        <div className='flex flex-col items-center justify-center gap-2 w-full'>
            {
                filteredProducts.map((product, index) => (
                    index < limit ? <ProductInfo key={index} {...product} openModal={() => openModal(product._id)} /> : null
                ))
            }
        </div>
        <div className='flex items-center justify-center gap-5'>
            <button 
            className='bg-blue-600 text-xl font-bold text-white py-2 px-4 rounded-lg disabled:bg-gray-400 hover:bg-blue-800' 
            disabled={limit === 10} 
            onClick={() => setLimit(limit - 10)}>
                Prev
            </button>
            <button 
            className='bg-blue-600 text-xl font-bold text-white py-2 px-4 rounded-lg disabled:bg-gray-400 hover:bg-blue-800 ' 
            disabled={limit === products.length} 
            onClick={() => setLimit(limit + 10)}>
                Next
            </button>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} productId={deleteProductId} />
    </div>
    )
}

export default HomePage