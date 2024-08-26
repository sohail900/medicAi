import React, { useState } from 'react'
import img2 from '/assets/img2.png'
import { TCardData, ICard } from '../../../types/types'
import Steps from './Steps'
const data: TCardData = [
    {
        id: 1,
        title: 'Upload Your Document',
        image: img2,
    },
    {
        id: 2,
        title: 'AI Analyzes the Data',
        image: img2,
    },
    {
        id: 3,
        title: 'Review and Download',
        image: img2,
    },
]
const CardCom: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1)
    const handleStepClick = (id: number) => {
        setActiveStep(id)
    }

    return (
        <>
            <section className='w-full px-16 mt-16'>
                <div className='mb-10'>
                    <h2 className='font-bold'>How does the card work?</h2>
                </div>
                <div className='flex justify-center flex-col items-center lg:flex-row gap-12 lg:gap-0'>
                    <div className='w-full lg:w-[40%] flex flex-wrap gap-12 lg:flex-col lg:flex-nowrap'>
                        {data.map((elem: ICard) => {
                            const { id, title } = elem
                            const isActive = id === activeStep
                            const isCompleted = id < activeStep
                            return (
                                <Steps
                                    key={id}
                                    id={id}
                                    handleStepClick={handleStepClick}
                                    isActive={isActive}
                                    length={data.length}
                                    isCompleted={isCompleted}
                                    title={title}
                                />
                            )
                        })}
                    </div>
                    <div className='w-full lg:w-[60%] shadow-primary-shadow overflow-hidden'>
                        <img
                            src={data[activeStep - 1].image}
                            alt={`img${activeStep}`}
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default CardCom
