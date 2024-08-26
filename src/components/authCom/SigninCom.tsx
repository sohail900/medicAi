import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import logo from '/assets/logo.png'
import AuthInput from './AuthInput'
import { Loader } from 'lucide-react'
// import GoogleAuth from './GoogleAuth'
const SigninCom: React.FC = () => {
    const [inputData, setInputData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    ///navigate to next page
    const navigate = useNavigate()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputData((prevState: { email: string; password: string }) => ({
            ...prevState,
            [name]: value,
        }))
    }
    // on sumbit handler
    ///  handle onSumbit form
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = inputData
        setInputData({ email: '', password: '' })
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('../ai', { state: { showToaster: false } })
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                if (error.message.includes('auth/invalid-credential')) {
                    setError('Invalid Credential')
                }
            } else {
                setError('Failed to Login..')
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Link to='/'>
                <img src={logo} alt='logo' className='mb-5' width={150} />
            </Link>
            <form
                method='post'
                className='w-full sm:w-[420px] md:w-[350px] lg:w-[400px] mt-10'
                onSubmit={submitHandler}
            >
                <AuthInput
                    id='email'
                    label='Email'
                    name='email'
                    placeholder='Email'
                    title='Sign In'
                    type='email'
                    onChange={handleInputChange}
                    value={inputData.email}
                />
                <AuthInput
                    id='password'
                    label='Password'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={handleInputChange}
                    value={inputData.password}
                />

                {error && <p className='my-1 text-red-500 text-sm'>{error}</p>}
                <div className='w-full flex justify-between items-center mt-6 mb-6'>
                    <Link
                        to='/forgot-password'
                        className='text-sm font-semibold text-red-600'
                    >
                        Forgot Password?
                    </Link>
                </div>
                <button
                    className='w-full px-4 py-3 text-center text-white bg-primary-color rounded-md transition-all grid place-items-center ease-linear hover:opacity-70 disabled:bg-gray-400'
                    disabled={loading}
                    type='submit'
                >
                    {loading ? (
                        <Loader size={25} className='animate-spin text-white' />
                    ) : (
                        'Sign In'
                    )}
                </button>
                {/* <p className='text-sm text-tertiary-color my-2 font-semibold text-center'>
                    Or
                </p> */}
                {/* <GoogleAuth /> */}
            </form>
        </>
    )
}

export default SigninCom
