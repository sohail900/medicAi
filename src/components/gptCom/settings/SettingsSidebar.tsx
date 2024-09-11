import React, { Dispatch, SetStateAction } from 'react'
import {
    BadgeCheck,
    PanelLeftClose,
    ShieldCheck,
    SlidersVertical,
    UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './style.css'
const barItems = [
    {
        Icon: SlidersVertical,
        title: 'General',
        link: '/',
    },
    {
        Icon: UserRound,
        title: 'Personal',
        link: '/p',
    },
    {
        Icon: ShieldCheck,
        title: 'Security',
        link: '/s',
    },
    {
        Icon: BadgeCheck,
        title: 'Subscription',
        link: '/sb',
    },
]
const SettingsSidebar: React.FC<{
    setSettingBar: Dispatch<SetStateAction<boolean>>
}> = ({ setSettingBar }) => {
    ///setSettingBar
    return (
        <>
            <section className='w-full '>
                <div className='w-full flex items-center justify-between'>
                    <h2 className='text-xl'>Settings</h2>
                    <button
                        className='w-7 h-7 grid place-items-center rounded-lg bg-[rgba(16,185,129,0.1)] text-primary-color'
                        onClick={() => setSettingBar(false)}
                    >
                        <PanelLeftClose size={20} />
                    </button>
                </div>
                <div className='flex flex-col gap-4 mt-12'>
                    {barItems?.map((elem, index) => {
                        const { Icon, title, link } = elem
                        return (
                            <NavLink
                                to={`.${link}`}
                                end
                                className='flex items-center px-8 w-full gap-2 bg-[#fafafa] py-3 rounded-lg font-medium transition-all ease-out dark:bg-[rgba(225,225,225,0.1)] hover:bg-primary-color hover:text-white '
                                key={index}
                            >
                                <Icon
                                    className='mr-4 hidden sm:block'
                                    size={20}
                                />
                                {title}
                            </NavLink>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default SettingsSidebar
