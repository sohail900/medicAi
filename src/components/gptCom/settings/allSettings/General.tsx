import React, { useEffect, useState } from 'react'
import {
    auth,
    where,
    query,
    collection,
    db,
    deleteDoc,
    getDocs,
} from '../../../../config/firebaseConfig'
import { Loader } from 'lucide-react'
import Toaster from '../../../Toaster'

const General: React.FC = () => {
    const [themeColor, setThemeColor] = useState('White')
    const [loading, setLoading] = useState(false)
    const theme = ['White', 'Dark']
    const language = ['Auto', 'Urdu', 'English']
    // Update the body class based on theme
    useEffect(() => {
        if (themeColor === 'Dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [themeColor])
    // deleted user's history
    const deleteHistory = async () => {
        try {
            setLoading(true)
            const user_id = auth.currentUser?.uid
            const chatCollection = collection(db, 'chat')
            /*
        @{if user id is matched then deleted user's chat history}
        */
            const q = query(chatCollection, where('user_id', '==', user_id))
            const snapShot = await getDocs(q)
            snapShot.forEach((doc) => {
                deleteDoc(doc.ref)
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <section className='mt-12 flex flex-col justify-center items-center w-full'>
                <div className='flex w-full  sm:w-[80%] md:w-[60%] mb-3 justify-between items-center border-b-[1px] border-[rgba(0,0,0,0.1)] pb-4 dark:border-[rgba(225,225,225,0.1)]'>
                    <h3 className='text-xl font-medium'>Theme</h3>
                    <select
                        className='text-lg bg-transparent'
                        value={themeColor}
                        onChange={(e) =>
                            setThemeColor(e.target.value as 'White' | 'Dark')
                        }
                    >
                        {theme.map((elem) => {
                            return (
                                <>
                                    <option
                                        key={elem}
                                        value={elem}
                                        onClick={() =>
                                            setThemeColor((pre) =>
                                                pre == 'White'
                                                    ? 'Dark'
                                                    : 'White'
                                            )
                                        }
                                    >
                                        {elem}
                                    </option>
                                </>
                            )
                        })}
                    </select>
                </div>
                {/* LANGUAGE */}
                <div className=' mt-7 flex w-full  sm:w-[80%] md:w-[60%]  mb-3 justify-between items-center border-b-[1px] border-[rgba(0,0,0,0.1)] pb-4 dark:border-[rgba(225,225,225,0.1)]'>
                    <h3 className='text-xl font-medium'>Language</h3>
                    <select className='text-lg bg-transparent'>
                        {language.map((elem) => {
                            return (
                                <>
                                    <option key={elem}>{elem}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                {/* BUTTON FOR CLEAR HISTORY */}
                <div className=' mt-9 flex w-full  sm:w-[80%] md:w-[60%] mb-3 justify-between items-center  pb-4'>
                    <h3 className='text-xl  font-medium'>Clear History</h3>
                    <button
                        className='py-3 px-6 rounded-full border-[1px] border-[rgba(0,0,0,0.1)] gird place-items-center disabled:bg-gray-300'
                        onClick={deleteHistory}
                        disabled={loading !== false}
                    >
                        {loading ? (
                            <Loader
                                size={26}
                                className='text-white animate-spain'
                            />
                        ) : (
                            'Clear'
                        )}
                    </button>
                </div>
            </section>
            {/* SHOW TOASTER */}
            <Toaster
                bg_color='bg-primary-color'
                isVisible={loading}
                onClose={() => setLoading(false)}
                message='History Clear'
            />
        </>
    )
}
export default General
