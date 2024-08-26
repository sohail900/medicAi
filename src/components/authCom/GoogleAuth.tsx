import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebaseConfig'

const GoogleAuth: React.FC = () => {
    const navigate = useNavigate()
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            // Access the Google user info
            const user = result.user
            console.log('User signed in:', user)
            // Handle post-sign-in actions such as redirecting the user or updating state
            navigate('../ai')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error signing in with Google:', error.message)
            } else {
                console.error('Error signing in with Google:', String(error))
            }
        }
    }

    return (
        <button
            className='w-full px-4 py-3 text-center font-semibold text-black flex items-center justify-center gap-2 rounded-md shadow-secondary-shadow transition-all ease-linear hover:text-primary-color '
            onClick={handleSignIn}
        >
            Sign In with Google{' '}
            <img src='/assets/Group.png' alt='Google logo' width={21} />
        </button>
    )
}

export default GoogleAuth
