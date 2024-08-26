import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { pricingData } from './pricingData'
import PricingCard from './PricingCard'
const Pricing: React.FC = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    return (
        <>
            <section className='px-16 mt-16' id='pricing'>
                <h2 className='font-bold mb-12 text-center'>Pricing</h2>
                <div className='flex justify-center gap-8 flex-wrap'>
                    <Elements stripe={stripePromise}>
                        {pricingData.map((elem) => {
                            return (
                                <>
                                    <PricingCard {...elem} width={380} />
                                </>
                            )
                        })}
                    </Elements>
                </div>
            </section>
        </>
    )
}

export default Pricing
