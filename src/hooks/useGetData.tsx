import { useEffect, useState } from 'react'
import { useCustomContext } from '../context/customContext'
import { fetchUserSubscription, getData } from '../service/chatService'
import { auth } from '../config/firebaseConfig'
import { DocumentData } from 'firebase/firestore'
const useGetData = () => {
    const [chatHistory, setChatHistory] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [subscribed, setSubscribed] = useState<DocumentData | null>(null)
    const { handlePrevResponse } = useCustomContext()
    // use effect to fetched all data
    const fetchedData = async () => {
        setLoading(true)
        const user_id = auth.currentUser?.uid
        const data = await getData(user_id as string)
        localStorage.removeItem('chatTitle')
        const subscribeData = await fetchUserSubscription()
        if (data) {
            setChatHistory(data)
        }
        if (subscribeData) {
            setSubscribed(subscribeData)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchedData()
    }, [])
    // filtered only chat that matched
    useEffect(() => {
        chatHistory?.filter((elem: any) => {
            if (elem.currentTitle === localStorage.getItem('chatTitle')) {
                handlePrevResponse(elem.respondDoc)
            }
        })
    }, [selectedChat])
    // on click handler

    return {
        handlePrevResponse,
        chatHistory,
        loading,
        setChatHistory,
        setLoading,
        setSelectedChat,
        fetchedData,
        selectedChat,
        subscribed,
    }
}

export default useGetData
