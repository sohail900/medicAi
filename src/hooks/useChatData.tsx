import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCustomContext } from '../context/customContext'
import {
    addDoc,
    doc,
    where,
    collection,
    db,
    updateDoc,
    query,
    getDocs,
    auth,
} from '../config/firebaseConfig'
import { TRef } from '../types/types'
export const useChatData = ({ textareaRef, fileInputRef }: TRef) => {
    const [message, setMessage] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [currentTitle, setCurrentTitle] = useState('')
    const { handleNewResponse } = useCustomContext()
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto' // Reset height
            textarea.style.height = `${textarea.scrollHeight}px` // Set height to scrollHeight
            // TODO: Textarea height grow logic
            textarea.style.transform = `translateY(-${
                textarea.scrollHeight - textarea.clientHeight
            }px)`
        }
    }
    useEffect(() => {
        adjustTextareaHeight() // Adjust height on component mount and message change
    }, [message])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const user_id = auth.currentUser?.uid
        // check is there any localStorage chat items exists
        let title = ''
        const getTitle = localStorage.getItem('chatTitle')
        if (getTitle) {
            title = getTitle
        } else {
            title = !currentTitle ? message : currentTitle
            if (!currentTitle) {
                setCurrentTitle(title)
            }
        }

        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('prompt', message)
        setMessage('')
        try {
            setFile(null)
            const respond = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/openai`,
                formData
            )
            const ai_response = respond.data.respondDoc
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            if (respond.status == 200) {
                handleNewResponse(respond.data)
                const chatCollection = collection(db, 'chat')
                const q = query(
                    chatCollection,
                    where('currentTitle', '==', title),
                    where('user_id', '==', user_id)
                )
                const snapShot = await getDocs(q)
                if (snapShot.empty) {
                    await addDoc(chatCollection, {
                        user_id: user_id,
                        currentTitle: title,
                        respondDoc: ai_response,
                        timeStamp: new Date(),
                    })
                } else {
                    const chatDoc = snapShot.docs[0]
                    const existingData = chatDoc.data()
                    const updatedDoc = [
                        ...existingData.respondDoc,
                        ...ai_response,
                    ]
                    const docRef = doc(db, 'chat', chatDoc.id)
                    await updateDoc(docRef, { respondDoc: updatedDoc })
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return { loading, handleSubmit, setMessage, message, file, setFile }
}
