import { LogOut, MessageCircle, Settings } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import sidelogo from '/assets/sidelogo.png'
import './style.css'
const Sidebar = () => {
    const navigate = useNavigate()
    //// handle signout
    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate('../')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='z-50 w-20 h-dvh py-4 px-3 border-r-[1px] border-[rgba(0,0,0,0.2)] flex flex-col items-center  gap-10 bg-white dark:bg-black dark:border-[rgba(225,225,225,0.2)]'>
                <img src={sidelogo} alt={sidelogo} width={50} />

                <NavLink to='.' end className='nav_link'>
                    <MessageCircle />
                </NavLink>
                <NavLink to='./settings' className='nav_link'>
                    <Settings />
                </NavLink>
                {/* <NavLink to='/help' className='nav_link'>
                    <CircleHelp />
                </NavLink> */}
                <hr className='w-full border-none h-[1.4px] bg-[rgba(0,0,0,0.3)] rounded-2xl mb-2 mt-2 dark:bg-[rgba(225,225,225,0.3)]'></hr>
                <button className='text-primary-color' onClick={handleSignout}>
                    <LogOut />
                </button>
            </section>
        </>
    )
}

export default Sidebar
