import React, { useEffect } from 'react'
import { IToaster } from '../types/types'
import { X } from 'lucide-react'

const Toaster: React.FC<IToaster> = ({
    message,
    isVisible,
    onClose,
    bg_color,
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000) // Auto close after 3 seconds
            return () => clearTimeout(timer)
        }
    }, [isVisible, onClose])

    return (
        <div
            className={`fixed top-5 transition-all duration-300 ease-in-out ${
                isVisible ? 'right-5' : '-right-full'
            } z-50`}
        >
            <div
                className={`${bg_color} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2`}
            >
                <span>{message}</span>
                <button
                    className='text-white hover:text-gray-300'
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}

export default Toaster
