import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import bgImage from '/assets/bg.png'
import Button from '../../Button'
const Hero: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className='w-full h-dvh relative'>
                <img
                    src={bgImage}
                    alt={bgImage}
                    className='absolute -top-40 -z-50'
                />
                <div className='flex flex-col items-center justify-center h-full  lg:h-[80%] text-center '>
                    <h1 className='w-[90%] md:w-[65%] lg:w-[55%] mb-6'>
                        AI-Powered Precision for Medical Documentation
                    </h1>
                    <p className='w-[90%] md:w-[65%] lg:w-[55%] mb-8 text-secondary-color text-[1.25rem]  leading-relaxed font-medium'>
                        Transform patient care with our advanced AI technology.
                        Automatically generate accurate SOAP notes from patient
                        documents, tailored to your specialty with unmatched
                        speed and precision.{' '}
                    </p>
                    <Button
                        className='btn_bg font-medium  w-[250px] flex justify-center mt-2 lg:mt-8'
                        icon={true}
                        onClick={() => navigate('./signup')}
                    >
                        Join Now <MoveRight size={23} className='mt-1' />
                    </Button>
                </div>
            </section>
        </>
    )
}

export default Hero
