import React from 'react'
import Sidebar from '../../layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const DocAi: React.FC = () => {
    return (
        <>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DocAi
