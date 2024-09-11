import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import Toaster from '../../components/Toaster'
import { Loader } from 'lucide-react'
import current_logo from '/assets/logo.png'
import { getContent } from '../../service/chatService'
import { useLogoUrl } from '../../hooks/useLogoUrl'
const Footer: React.FC = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [footer, setFooter] = useState('')
    const { logoUrl } = useLogoUrl()

    const logo = logoUrl || current_logo

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
    // fetched footer content
    useEffect(() => {
        const footerContent = async () => {
            const content = await getContent()
            if (content) {
                setFooter(content.footer)
            }
        }
        footerContent()
    }, [])

    return (
        <>
            <footer className='px-16 mt-20 mb-8 flex justify-between items-center flex-col lg:flex-row'>
                <div className='mb-4'>
                    <img src={logo} alt='footer_logo' width={160} />
                    <p className='font-medium mt-3 text-tertiary-color text-[0.95rem]'>
                        {footer || ' All Rights Reserved'}
                    </p>
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
