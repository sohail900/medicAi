import React, { useRef, useState } from 'react'
import { Paperclip, SendHorizontal, FileText, Loader } from 'lucide-react'
import { useCustomContext } from '../../../context/customContext'
import { useChatData } from '../../../hooks/useChatData'
const ChatInput = () => {
    const [file, setFile] = useState<File | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    /// used custom hooks
    const { uploadMedicFile } = useCustomContext()

    // give fileinput ref to uploadMedicFile FN
    if (fileInputRef) {
        uploadMedicFile(fileInputRef)
    }
    // Function to adjust the textarea height

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    const { handleSubmit, loading, message, setMessage } = useChatData({
        fileInputRef,
        textareaRef: textareaRef as React.RefObject<HTMLInputElement>,
    })
    return (
        <form
            className='w-full flex items-center bg-white drop-shadow-drop rounded-2xl relative dark:bg-black'
            onSubmit={handleSubmit}
        >
            {/* File Input */}
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                name='file'
                accept='.pdf,.txt,.docx'
            />

            {/* File Attachment Icon */}
            <button
                type='button'
                onClick={handleFileClick}
                className='text-primary-color absolute left-3 z-30'
            >
                <Paperclip />
            </button>

            {/* File Display (Top of the prompt input) */}
            <div className='flex flex-col w-full py-5'>
                {file && (
                    <div className='flex items-center space-x-1 ml-12 mb-2 px-2 py-2 rounded-xl text-primary-color bg-[rgba(16,185,129,0.1)] w-fit '>
                        <FileText size={30} />
                        <span className='text-lg'>{file.name}</span>
                    </div>
                )}
                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    name='message'
                    className='w-full px-12 resize-none focus:outline-none rounded-lg overflow-hidden bg-transparent text-black dark:text-white'
                    placeholder='Message Ai Medics'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={1}
                    style={{
                        height: 'auto',
                        transformOrigin: 'bottom', // Makes the textarea grow upwards
                    }}
                />
            </div>
            {/* Submit Button */}
            <button
                type='submit'
                disabled={loading}
                className='ml-2 absolute right-3 disabled:cursor-default'
            >
                {loading ? (
                    <Loader className='w-6 h-6 text-neutral-color animate-spin' />
                ) : (
                    <SendHorizontal
                        className={`w-6 h-6 ${
                            message.trim() || file
                                ? 'text-primary-color'
                                : 'text-tertiary-color'
                        }`}
                    />
                )}
            </button>
        </form>
    )
}
export default ChatInput
