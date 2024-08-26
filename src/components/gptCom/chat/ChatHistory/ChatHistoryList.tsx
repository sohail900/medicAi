import React from 'react'
import { IChat } from '../../../../types/types'
const ChatHistoryList: React.FC<IChat> = ({ title, day }) => {
    const getTitle = localStorage.getItem('chatTitle')
    // convert first word of title to Capital
    let capitalized
    if (typeof title === 'string') {
        capitalized = title?.slice(0, 1).toUpperCase() + title?.slice(1)
    }
    return (
        <>
            <div
                className={`flex flex-col items-start justify-between px-2 py-1 rounded-lg ${
                    getTitle === title ? 'bg-[rgba(0,0,0,0.04)]' : 'bg-white'
                } transition-all duration-200 ease-in-out hover:bg-[rgba(0,0,0,0.04)] dark:bg-black dark:text-white`}
            >
                <h3 className='w-full text-[1rem] font-medium truncate'>
                    {capitalized}
                </h3>
                <p className='text-[0.8rem] text-neutral-color text-normal'>
                    {day}
                </p>
            </div>
        </>
    )
}

export default ChatHistoryList
