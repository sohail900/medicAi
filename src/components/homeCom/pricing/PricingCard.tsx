import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { DocumentData } from 'firebase/firestore'
import { useStripe } from '@stripe/react-stripe-js'
import { auth } from '../../../config/firebaseConfig'
import { IPricing } from '../../../types/types'
import Button from '../../Button'
import { fetchUserSubscription } from '../../../service/chatService'

const PricingCard: React.FC<IPricing> = ({ id, title, price, features }) => {
    const [loading, setLoading] = useState(false)
    const [purchased, setPurchased] = useState<DocumentData | null>(null)
    const navigate = useNavigate()
    const stripe = useStripe()
    const baseURL = `${window.location.protocol}//${window.location.host}`

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const currentUser = auth.currentUser
        if (!currentUser?.uid) {
            navigate('./signin', { state: { showToaster: true } })
            return
        }

        try {
            setLoading(true)
            const session = await createCheckoutSession(currentUser)
            await redirectToCheckout(session)
        } catch (error) {
            console.error('Checkout error:', error)
        } finally {
            setLoading(false)
        }
    }

    const createCheckoutSession = async (user: {
        uid: string
        email: string | null
    }) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/checkout`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: title,
                    amount: price,
                    email: user.email,
                    uuid: user.uid,
                    successUrl: `${baseURL}/success`,
                    failureUrl: `${baseURL}`,
                }),
            }
        )
        return response.json()
    }

    const redirectToCheckout = async (session: { id: string; url: string }) => {
        if (!stripe) {
            console.error('Stripe has not been initialized')
            return
        }
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        })
        if (error) {
            console.error('Stripe checkout error:', error)
            return
        }
        navigate(session.url)
    }
    // fetched user's data

    const fetchSubscription = async () => {
        const data = await fetchUserSubscription()
        if (data) {
            setPurchased(data)
        }
    }
    fetchSubscription()
    return (
        <form
            className='w-[300px] h-auto px-5 shadow-primary-shadow py-6 flex flex-col justify-center gap-5 text-center rounded-2xl'
            key={id}
            onSubmit={handleSubmit}
        >
            <div>
                <h3 className='text-2xl mb-2 font-bold'>{title}</h3>
                <h3 className='text-[1.7rem] mb-2 font-bold text-primary-color'>
                    ${price}/months
                </h3>
            </div>
            <hr className='border-none w-full h-[1.2px] bg-[rgba(0,0,0,0.2)] mb-4' />
            <ul className='flex flex-col gap-4'>
                {features.map((feature) => (
                    <div
                        className='flex gap-2 flex-col sm:flex-row text-left'
                        key={feature}
                    >
                        <CircleCheck
                            className='text-white mt-1'
                            fill='#000'
                            size={19}
                        />
                        <li className='text-left'>{feature}</li>
                    </div>
                ))}
            </ul>
            <Button
                className={`w-full border-[1px] mt-8 border-[rgba(0,0,0,0.2)] rounded-full text-tertiary-color transition-all hover:bg-primary-color hover:text-white hover:border-transparent ${
                    purchased?.purchasedPlan === title
                        ? 'bg-primary-color text-white'
                        : 'bg-transparent'
                }`}
                type='submit'
            >
                {loading
                    ? 'Please Wait'
                    : purchased?.purchasedPlan === title
                    ? 'Subscribed'
                    : 'Subscribe Now'}
            </Button>
        </form>
    )
}

export default PricingCard
