import React, { Dispatch, SetStateAction } from 'react'
import { Columns2, SquarePen, BadgeCheck, Loader, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChatHistoryList from './ChatHistoryList'
import { convertTimeStamp } from '../../../../utils/converttimeStap'
import useGetData from '../../../../hooks/useGetData'
const ChatHistory: React.FC<{
    setSideSec: Dispatch<SetStateAction<boolean>>
}> = ({ setSideSec }) => {
    const {
        chatHistory,
        handlePrevResponse,
        loading,
        setSelectedChat,
        subscribed,
    } = useGetData()
    const navigate = useNavigate()

    // on click handler
    const handleOnClick = (currentTitle: string) => {
        setSelectedChat(currentTitle)
        localStorage.setItem('chatTitle', currentTitle)
    }
    // handle new chat
    const newChat = () => {
        localStorage.removeItem('chatTitle')
        handlePrevResponse([])
        setSelectedChat('')
    }
    return (
        <>
            <section className='h-full w-full px-5 py-4 relative '>
                <div className='w-full flex items-center justify-between'>
                    <button
                        className='w-7 h-7 grid place-items-center rounded-lg bg-[rgba(16,185,129,0.1)] text-primary-color'
                        onClick={() => setSideSec(false)}
                    >
                        <Columns2 size={20} />
                    </button>
                    <button className='w-7 h-7 grid place-items-center rounded-lg bg-[rgba(16,185,129,0.1)] text-primary-color'>
                        <SquarePen size={20} />
                    </button>
                </div>
                <h3 className='my-5 font-semibold text-lg text-black dark:text-white'>
                    Recent
                </h3>
                <button
                    className='w-full flex items-center justify-center py-2 rounded-xl bg-[rgba(16,185,129,0.1)] text-primary-color my-2 gap-1'
                    onClick={newChat}
                >
                    <Plus size={20} /> New Chat
                </button>
                <div className='mt-6 mb-5 overflow-y-auto h-[50%]'>
                    {loading ? (
                        <Loader
                            className='mx-auto text-primary-color animate-spin'
                            size={30}
                        />
                    ) : (
                        chatHistory?.map((elem) => {
                            const { user_id, currentTitle, timeStamp } = elem
                            const previousTime = convertTimeStamp(timeStamp)
                            return (
                                <>
                                    <div
                                        className='mb-3 cursor-pointer transition-all '
                                        key={user_id}
                                        onClick={() =>
                                            handleOnClick(currentTitle)
                                        }
                                    >
                                        <ChatHistoryList
                                            day={previousTime}
                                            title={currentTitle}
                                        />
                                    </div>
                                </>
                            )
                        })
                    )}
                </div>
                <div className='z-30 w-full overflow-hidden'>
                    <hr className='w-full border-none h-[1.2px] bg-[rgba(0,0,0,0.2)] mb-4 dark:bg-[rgba(225,225,225,0.2)]' />
                    <div
                        className='cursor-pointer w-full flex justify-center gap-2'
                        onClick={() => navigate('./settings/sb')}
                    >
                        <div className='w-12 h-12 grid place-items-center rounded-lg  bg-[rgba(16,185,129,0.1)] text-primary-color'>
                            <BadgeCheck />
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-[0.9rem] font-semibold text-black dark:text-white'>
                                {subscribed
                                    ? subscribed.purchasedPlan
                                    : 'Upgrade plan'}
                            </h3>
                            <p className='w-auto text-[0.9rem] text-tertiary-color line-clamp-2'>
                                {subscribed?.stripeCustomerId
                                    ? 'Unlimited document uploads'
                                    : 'Unlock advanced capabilities with GPT-4'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ChatHistory
