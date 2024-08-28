import React from 'react'
import { Upload } from 'lucide-react'
import sidelogo from '/assets/sidelogo.png'
import ShowChatSec from './ShowChatSec'
import { useCustomContext } from '../../../context/customContext'
const ChatSec: React.FC = () => {
    const { fileRef, respond } = useCustomContext()
    return (
        <>
            {/* Scrollable chat container */}
            <div className='w-full overflow-x-hidden px-4 sm:px-14 lg:px-24 space-y-4 h-[85%]'>
                {/* Logo and title */}
                <div className='flex flex-col items-center mb-8'>
                    <img src={sidelogo} alt='sidelogo' width={60} />
                    <h2 className='text-2xl font-semibold mt-2 text-black dark:text-white'>
                        AI Medics
                    </h2>
                    <p className='text-sm text-neutral-color'>
                        By doctor Octavius
                    </p>
                    <button
                        className='w-[120px] py-4 px-2 rounded-lg border-[1px] border-dashed border-[rgba(0,0,0,0.2] mt-3 text-sm text-tertiary-color flex flex-col items-center gap-2'
                        onClick={() => fileRef?.current?.click()}
                    >
                        Upload File <Upload size={19} />
                    </button>
                </div>
                {/* chat panel */}
                {respond?.map((elem, index) => {
                    const { role, message } = elem
                    return (
                        <>
                            <ShowChatSec
                                role={role}
                                message={message}
                                key={index}
                            />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ChatSec
