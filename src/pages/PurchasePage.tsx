import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { auth, db, doc, setDoc } from '../config/firebaseConfig'

const PurchageDone = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSessionData = async () => {
            const currentUser = auth.currentUser

            if (currentUser) {
                const queryParams = new URLSearchParams(window.location.search)
                const sessionId = queryParams.get('session_id')

                if (sessionId) {
                    // Fetch the session details from your server
                    const response = await fetch(
                        `${
                            import.meta.env.VITE_BASE_URL
                        }/checkout-session?sessionId=${sessionId}`
                    )
                    const session = await response.json()

                    // Store payment details in Firebase
                    const userRef = doc(db, 'users', currentUser.uid)
                    await setDoc(userRef, {
                        purchasedPlan: session.productName,
                        amount: session.amount,
                        paymentDate: new Date(),
                        stripeCustomerId: session.customer,
                        stripeSubscriptionId: session.subscription,
                    })

                    // Redirect to dashboard or wherever necessary
                    navigate('.//ai')
                }
            } else {
                navigate('./signin', { state: { showToaster: true } })
            }
        }

        fetchSessionData()
    }, [navigate])
    return (
        <>
            <div className='w-full h-dvh flex flex-col items-center justify-center'>
                <h1 className='text-primary-color mb-3 font-semibold text-5xl'>
                    Thank You for Subscribe
                </h1>
                <Check size={35} />
                <Link
                    to='../ai'
                    className='text-center w-1/2 text-tertiary-color font-medium text-3xl underline'
                >
                    Back to Home
                </Link>
            </div>
        </>
    )
}

export default PurchageDone
