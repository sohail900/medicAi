import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
const Security: React.FC = () => {
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
            <section className='w-full xl:w-[60%] mx-auto mt-8'>
                <div className='w-full flex justify-between gap-4 items-center flex-col md:flex-row border-b-[1px] border-[rgba(0,0,0,0.1)]'>
                    <div className='flex-1  pb-4'>
                        <h2 className='text-xl font-semibold'>
                            Multi-factor authentication
                        </h2>
                        <p className='w-auto md:w-[80%] text-sm text-tertiary-color'>
                            Require an extra security challenge when logging in.
                            If you are unable to pass this challenge, you will
                            have the option to recover your account via email.
                        </p>
                    </div>
                    <button className='w-auto px-4 py-3 mb-3 rounded-full border-[1px]  border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'>
                        Enable
                    </button>
                </div>
                <div className='mt-8 flex justify-center items-center gap-4 flex-col md:flex-row'>
                    <div className='flex-1 pb-4'>
                        <h2 className='text-xl font-semibold'>
                            Log out of all devices
                        </h2>
                        <p className='w-auto md:w-[80%] text-sm text-tertiary-color'>
                            Log out of all active sessions across all devices,
                            including your current session. It may take up to 30
                            minutes for other devices to be logged out.
                        </p>
                    </div>
                    <button
                        className='px-4 py-3 rounded-full border-[1px] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] '
                        onClick={handleSignout}
                    >
                        Log Out
                    </button>
                </div>
            </section>
        </>
    )
}

export default Security
