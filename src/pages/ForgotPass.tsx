import { useState } from 'react'
import { auth } from '../config/firebaseConfig' // Adjust path as needed
import { sendPasswordResetEmail } from 'firebase/auth'
import AuthInput from '../components/authCom/AuthInput'
import Toaster from '../components/Toaster'
import { Link } from 'react-router-dom'

const ForgotPass = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, email, {
                url: 'http://localhost:5173/reset-password', // Your app's URL
            })
            setMessage('Password reset email sent! Check your inbox.')
        } catch (error: any) {
            setMessage(`Error: ${error.message}`)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    return (
        <div className='px-5 sm:px-10  flex flex-col justify-center  w-full md:w-[550px] mx-auto'>
            <Link to='/'>
                <img
                    src='/assets/logo.png'
                    className='w-[160px] mb-10 mt-10 mx-auto'
                />
            </Link>
            <form onSubmit={handleResetPassword}>
                <AuthInput
                    id='email'
                    label='Password Reset Email'
                    name='email'
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='px-4 py-3 bg-primary-color text-white rounded-lg w-full mt-2 active:scale-95 transition-all duration-300'
                >
                    {loading ? 'Sending...' : 'Send Password Reset Email'}
                </button>
            </form>
            {/* toaster */}
            {message && (
                <Toaster
                    bg_color='bg-primary-color'
                    isVisible={loading}
                    message={message}
                    onClose={() => setLoading(false)}
                />
            )}
        </div>
    )
}
export default ForgotPass
