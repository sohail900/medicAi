import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'
import { pricingData } from '../../../homeCom/pricing/pricingData'
import PricingCard from '../../../homeCom/pricing/PricingCard'
const Subscription = () => {
    const navigate = useNavigate()
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    return (
        <>
            <section className='mt-16 '>
                <h2 className='text-xl font-bold mb-12 text-left'>
                    Subscription Plans
                </h2>
                <div className='hidden justify-center gap-8 flex-wrap  sm:flex'>
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
                <button
                    className='block sm:hidden bg-primary-color mt-4 px-4 py-3 text-white cursor-pointer rounded-xl'
                    onClick={() => navigate('../../../#pricing')}
                >
                    Check Plains
                </button>
            </section>
        </>
    )
}

export default Subscription
