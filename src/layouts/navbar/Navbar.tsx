import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircleUserRound, Menu } from 'lucide-react'
import { auth } from '../../config/firebaseConfig'
import logo from '/assets/logo.png'
import Button from '../../components/Button'
import ResponsiveNav from './ResponsiveNav'

const Navbar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(true)
            } else {
                setUser(false)
            }
        })

        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <nav className='px-8 py-8 flex justify-between items-center lg:px-16 lg:py-6'>
                <img src={logo} alt='logo' width={150} />

                {/* Desktop Menu */}
                <ul className='hidden lg:flex justify-center items-center gap-10'>
                    <li className='text-[1.05rem] mt-1 text-tertiary-color font-medium'>
                        <a href='#portfolio'>Why us</a>
                    </li>
                    <li className='text-[1.05rem] mt-1 text-tertiary-color font-medium'>
                        <a href='#pricing'>Pricing</a>
                    </li>
                    <li className='text-[1.05rem] mt-1 text-tertiary-color font-medium'>
                        <a href='#contact'>Contact</a>
                    </li>
                </ul>

                {/* Mobile Menu Icon */}
                <div className='lg:hidden'>
                    <Menu
                        className='text-primary-color cursor-pointer'
                        onClick={toggleMenu}
                        size={25}
                    />
                </div>

                {/* Desktop Profile or Auth Buttons */}
                <div className='hidden lg:flex items-center gap-4'>
                    {user ? (
                        <Link to='./ai'>
                            <CircleUserRound
                                size={30}
                                className='mt-1 cursor-pointer'
                                strokeWidth={1.4}
                            />
                        </Link>
                    ) : (
                        <>
                            <Button
                                className='bg-transparent text-primary-color font-medium'
                                onClick={() => navigate('/signin')}
                            >
                                Login
                            </Button>
                            <Button
                                className='bg-primary-color text-white'
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <ResponsiveNav setIsMenuOpen={setIsMenuOpen} user={user} />
                )}
            </nav>
        </>
    )
}

export default Navbar
