import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, productId }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(productId);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-around border-1 border-blue-500 bg-white w-96 p-4 h-[200px] rounded-lg shadow-md">
                <p className='text-lg font-semibold text-center w-[250px] overflow-x-hidden'>
                    ¿Estas seguro que deseas eliminar el producto?
                </p>
                <div className='flex items-center justify-center gap-3'>
                    <button className='bg-blue-600 text-white w-[120px] py-2 px-3 rounded-lg hover:bg-blue-800' onClick={handleConfirm}>
                    SI
                    </button>
                    <button className='bg-blue-600 text-white w-[120px] py-2 px-3 rounded-lg hover:bg-blue-800' onClick={onClose}>
                    NO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;