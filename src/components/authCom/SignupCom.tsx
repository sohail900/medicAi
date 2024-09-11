import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Loader } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import { auth, setDoc, doc, db } from '../../config/firebaseConfig'
import { useLogoUrl } from '../../hooks/useLogoUrl'
import current_logo from '/assets/logo.png'
import AuthInput from './AuthInput'
// import GoogleAuth from './GoogleAuth'
const SignupCom: React.FC = () => {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState<string | null>(null)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const { logoUrl } = useLogoUrl()
    const logo = logoUrl || current_logo
    //navigate to next page
    const navigate = useNavigate()
    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        // If the confirmPassword field is being changed, mark it as touched
        if (name === 'confirmPassword') {
            setPasswordTouched(true)
        }
    }
    ///  handle onSumbit form
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = inputData
        setLoading(true)
        try {
            // create user with email and password...
            const currentUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = currentUser.user
            // store user data in firebase
            await setDoc(doc(db, 'users', user.uid), {
                fullname: '',
                email: user.email,
                uid: user.uid,
                subscription: 'basic',
                createdAt: Timestamp.now(),
            })
            navigate('../ai', { state: { showToaster: true } })
        } catch (error) {
            if (error instanceof Error) {
                // Handle different types of errors
                if (error.message.includes('auth/email-already-in-use')) {
                    setShowError('This email is already in use.')
                } else if (error.message.includes('auth/invalid-email')) {
                    setShowError('The email address is not valid.')
                } else if (error.message.includes('auth/weak-password')) {
                    setShowError('The password is too weak.')
                } else {
                    setShowError(
                        'An unexpected error occurred. Please try again.'
                    )
                }
            } else {
                console.error('Unknown error:', error)
                setShowError('An unexpected error occurred. Please try again.')
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
                    title='Sign Up'
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
                <AuthInput
                    id='confirmPassword'
                    label='Confirm Password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    type='password'
                    onChange={handleInputChange}
                    value={inputData.confirmPassword}
                />
                {passwordTouched &&
                    inputData.confirmPassword !== inputData.password && (
                        <p className='text-red-500 text-sm my-2 text-semibold'>
                            Password not matched
                        </p>
                    )}
                {/* show error */}
                {showError && (
                    <p className='text-red-600 text-sm my-2 text-semibold'>
                        {showError}
                    </p>
                )}
                <button
                    className='w-full px-4 py-3 text-center text-white bg-primary-color rounded-md transition-all grid place-items-center ease-linear hover:opacity-70 disabled:bg-gray-400'
                    type='submit'
                    disabled={!!loading}
                >
                    {loading ? (
                        <Loader size={25} className='animate-spin text-white' />
                    ) : (
                        'Sign Up'
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

export default SignupCom
