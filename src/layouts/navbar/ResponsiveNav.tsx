import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { CircleUserRound, X } from 'lucide-react'
import Button from '../../components/Button'

const ResponsiveNav: React.FC<{
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
    user: boolean
}> = ({ setIsMenuOpen, user }) => {
    const navigate = useNavigate()
    const toggleMenu = () => {
        setIsMenuOpen((val: boolean) => !val)
    }
    // onclick button handler
    const handleClick = (path: string) => {
        setIsMenuOpen(false)
        navigate(path)
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className='fixed top-0 right-0 px-12 h-full z-30 bg-white shadow-lg flex flex-col items-center justify-center gap-8  lg:hidden w-[400px]'
            >
                {user && (
                    <Link to='./ai'>
                        <CircleUserRound
                            size={30}
                            className='mt-2 cursor-pointer'
                            strokeWidth={1.4}
                        />
                    </Link>
                )}
                <ul className='flex flex-col items-center gap-6'>
                    <li
                        className='text-[1.2rem] text-primary-color font-medium'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <a href='#portfolio' onClick={toggleMenu}>
                            Why us
                        </a>
                    </li>
                    <li
                        className='text-[1.2rem] text-primary-color font-medium'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <a href='#pricing' onClick={toggleMenu}>
                            Pricing
                        </a>
                    </li>
                    <li
                        className='text-[1.2rem] text-primary-color font-medium'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <a href='#contact' onClick={toggleMenu}>
                            Contact
                        </a>
                    </li>
                    {!user && (
                        <div className='flex flex-col items-center gap-4'>
                            <Button
                                className='bg-transparent text-primary-color font-medium'
                                onClick={() => handleClick('./signin')}
                            >
                                Login
                            </Button>
                            <Button
                                className='bg-primary-color text-white'
                                onClick={() => handleClick('./signup')}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </ul>
                <X
                    onClick={toggleMenu}
                    size={25}
                    className='absolute top-5 right-5 color-red-500 cursor-pointer'
                />
            </motion.div>
        </>
    )
}

export default ResponsiveNav
