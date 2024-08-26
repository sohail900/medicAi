import { FC } from 'react'
import { ICarosul } from '../../../types/types'
const ReviewCarosal: FC<ICarosul> = ({
    clientName,
    desc,
    id,
    label,
    profileImg,
    title,
}) => {
    return (
        <>
            <section
                className='w-full h-auto flex flex-col justify-center px-5 sm:px-10 py-14  shadow-primary-shadow rounded-md gap-5 mt-6 mb-5'
                key={id}
            >
                <h3 className='text-primary-color mb-3 text-xl sm:text-2xl font-semibold text-center'>
                    &#xFF02;
                    {title}&#xFF02;
                </h3>
                <p className='text-tertiary-color text-lg sm:text-xl mb-4'>
                    {desc}
                </p>
                <div className='flex items-center gap-2'>
                    <img
                        src={profileImg}
                        alt={profileImg}
                        width={60}
                        className='aspect-square object-cover rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='text-secondary-color font-semibold text-lg'>
                            {clientName}
                        </p>
                        <p className='text-tertiary-color text-sm'>{label}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReviewCarosal
