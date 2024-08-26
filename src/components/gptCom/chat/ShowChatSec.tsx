import React, { useEffect, useRef } from 'react'
import sidelogo from '/assets/sidelogo.png'
const ShowChatSec: React.FC<{ role: string; message: string }> = ({
    role,
    message,
}) => {
    const messageEndRef = useRef(null)
    useEffect(() => {
        if (messageEndRef.current) {
            const current = messageEndRef.current as HTMLElement
            current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [message])

    return (
        <>
            {/* User's request */}
            {role === 'user' ? (
                <div className='w-full lg:w-[60%] float-right'>
                    <p className='w-fit  bg-[rgba(0,0,0,0.04)] py-2 px-4 rounded-xl text-right  break-words float-right leading-relaxed text-[1rem] tracking-wide font-normal dark:bg-[rgba(225,225,225,0.2)] dark:text-white'>
                        {message}
                    </p>
                </div>
            ) : (
                <div className='overflow-x-hidden w-auto flex items-start gap-1 float-left relative mt-7'>
                    <img
                        src={sidelogo}
                        alt='sidelogo'
                        width={36}
                        className='object-cover mt-2'
                    />
                    <div className='w-fit text-left font-normal bg-gray-50 py-2 px-4 rounded-2xl break-words relative dark:bg-[rgba(0,0,0,0.5)] dark:text-white'>
                        <p className=' leading-relaxed text-[1rem] tracking-wide'>
                            {message}
                        </p>
                        <span ref={messageEndRef} />
                    </div>
                </div>
            )}
        </>
    )
}

export default ShowChatSec
