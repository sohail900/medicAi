import { IPricing } from '../../../types/types'

export const pricingData: IPricing[] = [
    {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        title: 'Basic Plain',
        price: 19.99,
        features: [
            'Upload upto 50 documents per month',
            'Standard AI processing speed',
            'Basic SOAP note customization',
            'Email support',
            'Access on all devices',
        ],
    },
    {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        title: 'Pro Plan',
        price: 49.99,
        features: [
            'Upload upto 200 documents per month',
            'Fast AI processing speed',
            'Advanced SOAP note customization',
            'Priority email and chat support',
            'Integration with EHR systems',
        ],
    },
    {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        title: 'Premium Plan',
        price: 99.99,
        features: [
            'Unlimited document uploads',
            'Fastest AI processing speed',
            'Full SOAP note customization ',
            'Dedicated account manager',
            'Detailed analytics and reporting',
        ],
    },
]
