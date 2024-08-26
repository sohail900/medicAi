import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig'
import { Loading } from '../components/Loading'

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        // Optional: listen to authentication state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Redirect authenticated users to /ai if trying to access /signin or /signup
                if (
                    location.pathname === '/signin' ||
                    location.pathname === '/signup'
                ) {
                    navigate('/ai')
                }
            } else {
                // Redirect unauthenticated users to /signin or /signup based on current route
                if (
                    location.pathname !== '/signin' &&
                    location.pathname !== '/signup'
                ) {
                    navigate('/signin')
                }
            }
            setLoading(false)
        })

        return () => unsubscribe() // Cleanup subscription on unmount
    }, [navigate, location.pathname])

    if (loading) {
        return <Loading /> // Or a spinner/loading component
    }

    return children
}

export default ProtectedRoute
