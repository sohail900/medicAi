import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loading } from '../components/Loading'
import DocAi from '../pages/docai/DocAi'
import Chat from '../components/gptCom/chat/Chat'
import Settings from '../components/gptCom/settings/Settings'
import PersonalSett from '../components/gptCom/settings/allSettings/PersonalSett'
import General from '../components/gptCom/settings/allSettings/General'
import Subscription from '../components/gptCom/settings/allSettings/Subscription'
import Security from '../components/gptCom/settings/allSettings/Security'
import ProtectedRoute from './ProtectedRoute'
const Home = lazy(() => import('../pages/home/Home'))
const Signin = lazy(() => import('../pages/signin/Signin'))
const Signup = lazy(() => import('../pages/signup/Signup'))
const DiscountsPage = lazy(() => import('../pages/DiscountsPage'))
const NotFound = lazy(() => import('../pages/NotFound'))
const PurchageDone = lazy(() => import('../pages/PurchasePage'))
const PageRouter = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/dic',
            element: <DiscountsPage />,
        },
        {
            path: '/signin',
            element: (
                <ProtectedRoute>
                    <Signin />
                </ProtectedRoute>
            ),
        },
        {
            path: '/signup',
            element: (
                <ProtectedRoute>
                    <Signup />
                </ProtectedRoute>
            ),
        },
        {
            path: '/success',
            element: (
                <ProtectedRoute>
                    <PurchageDone />
                </ProtectedRoute>
            ),
        },
        {
            path: '*',
            element: <NotFound />,
        },
        {
            path: '/ai',
            element: (
                <ProtectedRoute>
                    <DocAi />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '', // /ai/chat
                    element: (
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'settings', // /ai/chat
                    element: (
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    ),
                    children: [
                        {
                            path: 'p',
                            element: <PersonalSett />,
                        },
                        {
                            path: '',
                            element: <General />,
                        },
                        {
                            path: 'sb',
                            element: <Subscription />,
                        },
                        {
                            path: 's',
                            element: <Security />,
                        },
                    ],
                },
            ],
        },
    ])
    return (
        <>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={routes} />
            </Suspense>
        </>
    )
}

export default PageRouter
