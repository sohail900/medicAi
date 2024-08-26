import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Loader } from 'lucide-react'
import Button from '../../Button'
import './style.css'
const InputField: React.FC = () => {
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: null,
        message: '',
    })
    const [loading, setLoading] = useState(false)
    // handle on change
    const onChangeHandler = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name
        const value = e.target.value

        setInputValues((prev) => ({ ...prev, [name]: value }))
    }
    // submit handler
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const mailtoLink = `mailto:ashakoor101176@gmail.com?fullname=${encodeURIComponent(
            inputValues.firstName + inputValues.lastName
        )}&body=${encodeURIComponent(inputValues.message)}`
        window.location.href = mailtoLink // Trigger mailto link
        setLoading(false)
        setInputValues({
            firstName: '',
            lastName: '',
            email: '',
            number: null,
            message: '',
        })
    }
    return (
        <>
            <form method='post' className='flex-1' onSubmit={submitHandler}>
                <div className='w-full mb-3 flex items-center gap-2 flex-col sm:flex-row'>
                    <input
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        className='input_fields'
                        onChange={onChangeHandler}
                        value={inputValues.firstName}
                        required
                    />
                    <input
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        className='input_fields'
                        onChange={onChangeHandler}
                        value={inputValues.lastName}
                        required
                    />
                </div>
                <div className='w-full mb-3 flex items-center gap-2 flex-col sm:flex-row'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='input_fields'
                        onChange={onChangeHandler}
                        required
                        value={inputValues.email}
                    />
                    <input
                        type='number'
                        name='phone'
                        placeholder='Phone'
                        className='input_fields'
                        onChange={onChangeHandler}
                        value={inputValues?.number! || null}
                        required
                    />
                </div>
                <textarea
                    name='message'
                    className='w-full h-[100px] border-b-[1.5px] px-3 py-4 border-[rgba(0,0,0,0.2)] mb-5 focus:outline-none focus:ring-0 focus:border-[#10B981]'
                    onChange={onChangeHandler}
                    placeholder='Message'
                    required
                    value={inputValues.message}
                ></textarea>
                <Button
                    className='grid place-items-center btn_bg float-right w-1/3'
                    type='submit'
                >
                    {loading ? (
                        <Loader size={24} className='text-white animate-spin' />
                    ) : (
                        'Send'
                    )}
                </Button>
            </form>
        </>
    )
}
export default InputField
