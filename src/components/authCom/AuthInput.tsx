import React from 'react'
import { IAuth } from '../../types/types'
const AuthInput: React.FC<IAuth> = ({
    title,
    placeholder,
    type,
    name,
    id,
    label,
    value,
    onChange,
}) => {
    return (
        <>
            <h2 className='text-xl mb-3'>{title}</h2>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='email' className='font-semibold text-[1rem]'>
                    {label}
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    className='border-none  px-5 py-4 bg-white rounded-lg drop-shadow-drop'
                    value={value}
                    onChange={onChange}
                    required
                />
            </div>
        </>
    )
}

export default AuthInput
