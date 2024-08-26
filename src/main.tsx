import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ContextProvider } from './context/customContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </StrictMode>
)
