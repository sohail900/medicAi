import React from 'react'

const AuthLayouts: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <section className='w-full sm:w-[420px] md:w-full h-auto md:h-full flex flex-col px-4 py-10 items-center justify-center bg-custom-gradient sm:rounded-2xl md:rounded-none'>
                {children}
            </section>
        </>
    )
}

export default AuthLayouts
