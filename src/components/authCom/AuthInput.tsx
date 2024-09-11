import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
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
    const [showPassword, setShowPassword] = useState('password')
    return (
        <>
            <h2 className='text-xl mb-3'>{title}</h2>
            <div className='flex flex-col gap-2 mb-4 relative'>
                <label htmlFor='email' className='font-semibold text-[1rem]'>
                    {label}
                </label>
                <input
                    type={type === 'password' ? showPassword : type}
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    className='border-none  px-5 py-4 bg-white rounded-lg drop-shadow-drop'
                    value={value}
                    onChange={onChange}
                    required
                />
                {type === 'password' && (
                    <div className='cursor-pointer absolute right-3 top-[3.05rem]'>
                        {showPassword === 'text' ? (
                            <Eye
                                onClick={() => setShowPassword('password')}
                                size={20}
                            />
                        ) : (
                            <EyeOff
                                onClick={() => setShowPassword('text')}
                                size={20}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default AuthInput
