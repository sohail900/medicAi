import { useEffect, useState } from 'react'
import { updateEmail, updateProfile } from 'firebase/auth'
import { auth } from '../../../../config/firebaseConfig'
import { CircleUserRound, Loader } from 'lucide-react'
const PersonalSett = () => {
    const [userData, setUserData] = useState({ email: '', name: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    useEffect(() => {
        // Display the current user's name, email, and profile image
        if (auth.currentUser) {
            setUserData({
                email: auth.currentUser.email || '',
                name: auth.currentUser.displayName || '',
            })
        }
    }, [])
    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const currentUser = auth.currentUser
            if (currentUser) {
                // Update email
                await updateEmail(currentUser, userData.email)
                await updateProfile(currentUser, {
                    displayName: userData.name,
                })
            }
        } catch (error) {
            console.log('Error updating profile:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className='w-full h-full flex flex-col items-center'>
                <CircleUserRound size={120} strokeWidth={1.4} />
                <form className='mt-5' onSubmit={handleSumbit}>
                    <div className='w-full flex items-center justify-center gap-3 flex-wrap'>
                        <div className='flex flex-col '>
                            <label htmlFor='name'>Full Name</label>
                            <input
                                name='name'
                                id='name'
                                value={userData.name}
                                type='text'
                                placeholder='Name'
                                onChange={handleChange}
                                className='w-full px-3 py-2 border-none bg-white drop-shadow-drop mt-2 rounded-md focus:outline-none dark:text-black'
                            />
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor='email'>Email</label>
                            <input
                                name='email'
                                id='email'
                                value={userData.email}
                                type='email'
                                placeholder='Email'
                                onChange={handleChange}
                                className='w-full px-3 py-2 border-none bg-white drop-shadow-drop mt-2 rounded-md focus:outline-none dark:text-black'
                            />
                        </div>
                    </div>
                    <button
                        className='cursor-pointer z-10 px-12 py-2 float-right text-white bg-primary-color rounded-lg mt-4 disabled:bg-gray-300 grid place-items-center'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader size={23} className='animate-spin' />
                        ) : (
                            'Update'
                        )}
                    </button>
                </form>
            </section>
        </>
    )
}

export default PersonalSett
