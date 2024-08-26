import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import ChatHistory from './ChatHistory/ChatHistory'
import ChatSec from './ChatSec'
import ChatInput from './ChatInput'
const Chat: React.FC = () => {
    const [sideSec, setSideSec] = useState(false)
    return (
        <>
            <div className='w-full h-dvh flex relative'>
                <button
                    className='w-10 h-10 bg-[rgba(16,185,129,0.1)]  grid place-items-center text-primary-color mt-4 lg:hidden absolute left-30 top-0 z-30 rounded-xl'
                    onClick={() => setSideSec(true)}
                >
                    <ChevronRight size={28} />
                </button>
                <div
                    className={`z-30 w-auto  lg:w-[25%] h-full bg-white shadow-secondary-shadow absolute transition-all duration-300 ease-in-out ${
                        sideSec ? 'left-0' : '-left-[500px] '
                    } lg:left-0 lg:relative dark:bg-black`}
                >
                    <ChatHistory setSideSec={setSideSec} />
                </div>
                <div className='flex-1' onClick={() => setSideSec(false)}>
                    <div className='w-full h-screen flex flex-col items-center pt-14 pb-4 bg-[#FAFAFA] relative dark:bg-[#000]'>
                        <ChatSec />
                        <div className='w-[80%] lg:w-3/5 px-4 lg:px-7 fixed bottom-4'>
                            <ChatInput />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
