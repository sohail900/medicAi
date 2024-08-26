import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICardLeft } from '../../../types/types'
const Steps: React.FC<ICardLeft> = ({
    id,
    handleStepClick,
    isActive,
    length,
    isCompleted,
    title,
}) => {
    return (
        <>
            <div
                key={id}
                className='flex items-center  gap-4 cursor-pointer'
                onClick={() => handleStepClick(id)}
            >
                <AnimatePresence>
                    <motion.p
                        className={`w-9 h-9 relative rounded-full grid place-items-center border-2 ${
                            isActive
                                ? 'bg-primary-color text-white border-primary-color'
                                : 'bg-transparent text-green-500 border-green-500'
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isActive ? 1.2 : 1 }}
                        transition={{
                            duration: 0.3,
                            type: 'spring',
                            stiffness: 300,
                        }}
                    >
                        {id}
                        {id < length && (
                            <motion.div
                                className={`hidden lg:block absolute left-4 top-9 w-[2px]  ${'bg-primary-color'}`}
                                initial={{ height: 0 }}
                                animate={{
                                    height: isCompleted ? '40px' : 0,
                                }}
                                exit={{ height: 0 }}
                                transition={{
                                    duration: 0.4,
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                            />
                        )}
                    </motion.p>
                </AnimatePresence>
                <p
                    className={`text-xl font-normal ${
                        isActive ? 'text-primary-color' : ''
                    }`}
                >
                    {title}
                </p>
            </div>
        </>
    )
}

export default Steps
