import React, { createContext, useState, useContext } from 'react'
import { ICustomContextType } from '../types/types'
// Create the context with default value
const CustomContext = createContext<ICustomContextType>(null!)

// Create a provider component
export const ContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [respond, setRespond] = useState<any[]>([])
    const [fileRef, setfileRef] =
        useState<React.RefObject<HTMLInputElement> | null>(null)
    // Add functions to update state
    const uploadMedicFile = (element: React.RefObject<HTMLInputElement>) =>
        setfileRef(element)
    const handleNewResponse = (newResponse: any) => {
        setRespond((prevRespond) => [...prevRespond, ...newResponse.respondDoc])
        return {}
    }
    const handlePrevResponse = (newResponse: any) => {
        setRespond([...newResponse])
        return {}
    }
    return (
        <CustomContext.Provider
            value={{
                fileRef,
                uploadMedicFile,
                respond,
                handleNewResponse,
                handlePrevResponse,
            }}
        >
            {children}
        </CustomContext.Provider>
    )
}

// Create a custom hook to use the context
export const useCustomContext = () => useContext(CustomContext)
