import { useState, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SettingsSidebar from './SettingsSidebar'
const Settings: FC = () => {
    const [settingBar, setSettingBar] = useState(false)
    return (
        <>
            <section className='w-full h-dvh flex relative'>
                <button
                    className='w-10 h-10 bg-[rgba(16,185,129,0.1)]  grid place-items-center text-primary-color mt-4 lg:hidden absolute left-30 top-0 z-30 rounded-xl'
                    onClick={() => setSettingBar(true)}
                >
                    <ChevronRight size={28} />
                </button>
                <div
                    className={`z-30 w-auto lg:w-[25%] h-full bg-white px-4 py-5 shadow-secondary-shadow absolute transition-all duration-300 ease-in-out ${
                        settingBar ? 'left-0' : '-left-full'
                    } lg:left-0 lg:relative bg-white text-black dark:bg-black dark:text-white`}
                >
                    <SettingsSidebar setSettingBar={setSettingBar} />
                </div>
                <div
                    className='flex-1 py-8 px-4 sm:px-14 lg:px-24 bg-[#fafafa] overflow-y-auto text-black dark:bg-[#000] dark:text-white'
                    onClick={() => setSettingBar(false)}
                >
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default Settings
