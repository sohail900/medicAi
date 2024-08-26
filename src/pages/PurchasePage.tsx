import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const PurchageDone = () => {
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
