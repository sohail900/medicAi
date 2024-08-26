import React, { useState } from 'react'
import { db } from '../../config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import Toaster from '../../components/Toaster'
import { Loader } from 'lucide-react'
const Footer: React.FC = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    // handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            setEmail('')
            await addDoc(collection(db, 'daily_subs'), {
                email,
                timeStamp: new Date(),
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <footer className='px-16 mt-20 mb-8 flex justify-between items-center flex-col lg:flex-row'>
                <div className='mb-4'>
                    <img src='/assets/logo.png' alt='footer_logo' width={160} />
                    <div className='flex items-center font-medium gap-2 flex-wrap'>
                        <p className='text-[0.9rem] text-[##6F6C90] relative before:content-[""]before:absolute before:w-[1px] before:h-[100%] before:bg-[#6F6C90] before:right-[-10%] before:top-1/2'>
                            Copyright © XYZ -
                        </p>
                        <p className='text-[0.9rem] text-[##6F6C90]'>
                            All Rights Reserved
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className='font-bold text-[1rem] sm:text-lg mb-2'>
                        Subscribe to receive free health advice every month.
                    </h3>
                    <form
                        className='w-full border-b-[1.2px] border-[rgba(0,0,0,0.2)] flex gap-1 py-3 px-2 flex-col sm:flex-row'
                        method='post'
                        onSubmit={handleSubmit}
                    >
                        <input
                            type='email'
                            name='email'
                            className='border-none focus:outline-none focus:ring-0 flex-1 border-b-[1px] border-[rgba(0,0,0,0.2)] mb-3 sm:mb-0'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <button
                            className='w-auto sm:w-[30%] px-5 rounded-lg py-3 border-[1px] border-[#10B981] text-primary-color font-semibold transition-all duration-200 hover:opacity-70'
                            type='submit'
                        >
                            {loading ? (
                                <Loader
                                    size={24}
                                    className='text-primary-color animate-spain mx-auto'
                                />
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                    </form>
                </div>
            </footer>
            {/* toaster section */}
            <Toaster
                message='Thank you for Subscribe!'
                bg_color='bg-primary-color'
                isVisible={loading}
                onClose={() => setLoading(false)}
            />
        </>
    )
}
export default Footer
