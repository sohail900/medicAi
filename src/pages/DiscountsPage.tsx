import { useEffect, useState } from 'react'

const DiscountsPage = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return (
        <>
            {isOnline && (
                <div className='w-full h-dvh flex flex-col items-center justify-center'>
                    <h1 className='text-primary-color mb-3 font-semibold'>
                        Internet Connection Lost
                    </h1>
                    <p className='w-1/2 text-tertiary-color font-medium'>
                        It seems you've lost your internet connection. Please
                        reconnect to access the discounts.
                    </p>
                </div>
            )}
        </>
    )
}

export default DiscountsPage
