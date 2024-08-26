import React, { createContext, useState, useContext } from 'react'

// Define the context type
interface CustomContextType {
    uploadFile: React.RefObject<HTMLInputElement> | null
    uploadMedicFile: (element: React.RefObject<HTMLInputElement>) => void
    respond: any[]
    handleNewResponse: (newResponse: any) => {}
    handlePrevResponse: (newResponse: any) => {}
}

// Create the context with default value
const CustomContext = createContext<CustomContextType>(null!)

// Create a provider component
export const ContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [respond, setRespond] = useState<any[]>([])
    const [uploadFile, setUploadFile] =
        useState<React.RefObject<HTMLInputElement> | null>(null)
    // Add functions to update state
    const uploadMedicFile = (element: React.RefObject<HTMLInputElement>) =>
        setUploadFile(element)
    const handleNewResponse = (newResponse: any) => {
        setRespond((prevRespond) => [...prevRespond, ...newResponse.respondDoc])
        return {}
    }
    const handlePrevResponse = (newResponse: any) => {
        console.log(newResponse)
        setRespond([...newResponse])
        return {}
    }
    return (
        <CustomContext.Provider
            value={{
                uploadFile,
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
export const useCustomContext = () => {
    return useContext(CustomContext)
}
