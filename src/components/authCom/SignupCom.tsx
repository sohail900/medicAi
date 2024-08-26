import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import logo from '/assets/logo.png'
import AuthInput from './AuthInput'
import { Loader } from 'lucide-react'
// import GoogleAuth from './GoogleAuth'
const SignupCom: React.FC = () => {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    //navigate to next page
    const navigate = useNavigate()
    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    ///  handle onSumbit form
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = inputData
        setLoading(true)
        try {
            // create user with email and password...
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('../ai')
        } catch (error) {
            console.log(error)
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
                {inputData.password !== inputData.confirmPassword && (
                    <p className='text-red-500 text-sm my-1 '>
                        Password not matched
                    </p>
                )}
                <AuthInput
                    id='confirmPassword'
                    label='Confirm Password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    type='password'
                    onChange={handleInputChange}
                    value={inputData.confirmPassword}
                />
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
