import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayouts from '../../layouts/AuthLayouts'
import Button from '../../components/Button'
import { ArrowRight } from 'lucide-react'
import SigninCom from '../../components/authCom/SigninCom'
import Toaster from '../../components/Toaster'

const Signin: React.FC = () => {
    const [showToaster, setShowToaster] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        // Check if state passed from navigate contains showToaster
        if (location?.state?.showToaster) {
            setShowToaster(true)
        }
    }, [location?.state])
    return (
        <>
            <section className='w-full h-auto md:h-dvh flex justify-center flex-col md:flex-row'>
                <div className='w-full sm:w-auto md:w-[60%] py-12 px-7 sm:px-16 mx-auto'>
                    <SigninCom />
                </div>
                <div className='w-auto sm:w-auto mt-8 md:mt-0 md:flex-1 h-full flex flex-col items-center justify-center mx-auto'>
                    <AuthLayouts>
                        <h2 className='text-white'>New here</h2>
                        <p className='text-white text-lg text-center mt-5 mb-7 w-[70%]'>
                            "Sign up to start using our AI-powered SOAP note
                            generator. It’s quick, secure, and tailored to your
                            needs."
                        </p>
                        <Button
                            className='w-auto lg:w-[50%] bg-white text-primary-color flex items-center justify-center'
                            onClick={() => navigate('/signup')}
                        >
                            Create Account <ArrowRight />
                        </Button>
                    </AuthLayouts>
                </div>
            </section>
            {showToaster && (
                <Toaster
                    isVisible={showToaster}
                    message='Please Login First'
                    onClose={() => setShowToaster(false)}
                    bg_color='bg-[#f55045]'
                />
            )}
        </>
    )
}

export default Signin
