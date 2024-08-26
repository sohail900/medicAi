import { FC } from 'react'
import { IPtCard } from '../../../types/types'
const PortfolioCard: FC<IPtCard> = (props) => {
    const { desc, image, title } = props
    return (
        <>
            <div className='w-full h-full sm:w-[22rem] sm:h-[26rem] rounded-2xl shadow-primary-shadow grid place-items-center px-7 sm:px-12 py-4 text-center'>
                <img src={image} alt={image} className='w-[4rem] mb-4' />
                <h2 className='text-primary-color text-[1.3rem] sm:text-[1.5rem]'>
                    {title}
                </h2>
                <p className='text-[1rem] sm:text-[1.1rem] text-tertiary-color  sm:-mt-7 font-medium leading-relaxed'>
                    &#xFF02;{desc}&#xFF02;
                </p>
            </div>
        </>
    )
}

export default PortfolioCard
