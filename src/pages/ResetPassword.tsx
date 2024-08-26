import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { auth } from '../config/firebaseConfig' // Adjust path as needed
import { confirmPasswordReset } from 'firebase/auth'
import AuthInput from '../components/authCom/AuthInput'
import Toaster from '../components/Toaster'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const oobCode = searchParams.get('oobCode') // Extract oobCode from URL
    const navigate = useNavigate()

    useEffect(() => {
        if (!oobCode) {
            setMessage('Invalid or missing reset code.')
        }
    }, [oobCode])

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }
        try {
            await confirmPasswordReset(auth, oobCode as string, password)
            setMessage('Password reset successful! You can now log in.')
            setLoading(true)
            navigate('/login') // Redirect to login page after successful reset
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`)
            } else {
                setMessage('An unknown error occurred')
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='px-5 sm:px-10  flex flex-col justify-center  w-full md:w-[550px] mx-auto'>
            <img
                src='/assets/logo.png'
                className='w-[160px] mb-10 mt-10 mx-auto'
            />
            <form onSubmit={handleResetPassword}>
                <AuthInput
                    id='password'
                    label='Password'
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                    id='password'
                    label='Confirm Password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='px-4 py-3 bg-primary-color text-white rounded-lg w-full mt-2 active:scale-95 transition-all duration-300'
                >
                    {loading ? 'Sending...' : 'Reset Password'}
                </button>
            </form>
            {/* toaster */}
            <Toaster
                bg_color='bg-primary-color'
                isVisible={loading}
                message={message}
                onClose={() => setLoading(false)}
            />
        </div>
    )
}
export default ResetPassword
