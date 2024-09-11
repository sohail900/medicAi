import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../layouts/sidebar/Sidebar'
import Toaster from '../../components/Toaster'

const DocAi: React.FC = () => {
    const [toaster, setToaster] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if (location.state?.showToaster) {
            setToaster(true)
        } else {
            setToaster(false)
        }
    }, [location.state])
    return (
        <>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
            {toaster && (
                <Toaster
                    bg_color='bg-primary-color'
                    isVisible={toaster}
                    onClose={() => setToaster(false)}
                    message='Successfully Created New Account'
                />
            )}
        </>
    )
}

export default DocAi
