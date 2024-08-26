import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayouts from '../../layouts/AuthLayouts'
import Button from '../../components/Button'
import { ArrowRight } from 'lucide-react'
import SignupCom from '../../components/authCom/SignupCom'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className='w-full h-auto md:h-dvh flex justify-center flex-col md:flex-row'>
                <div className='w-full sm:w-auto md:w-[60%] py-12 px-7 sm:px-16 md:py-5 mx-auto'>
                    <SignupCom />
                </div>
                <div className='w-auto sm:w-auto mt-8 md:mt-0 md:flex-1 h-full flex flex-col items-center justify-center mx-auto'>
                    <AuthLayouts>
                        <h2 className='text-white'>Have an Account</h2>
                        <p className='text-white text-lg text-center mt-5 mb-7 w-[70%]'>
                            "Login to continue where you left."
                        </p>
                        <Button
                            className='w-auto lg:w-[50%] bg-white text-primary-color flex items-center justify-center'
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                            <ArrowRight />
                        </Button>
                    </AuthLayouts>
                </div>
            </section>
        </>
    )
}

export default Signup
