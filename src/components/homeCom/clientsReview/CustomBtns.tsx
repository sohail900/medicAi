import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
const NextBtn: FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <>
            <div className='mask w-28 h-full absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center '>
                <button
                    className='w-12 h-12 grid place-items-center rounded-full bg-primary-color text-white cursor-pointer z-20 mr-5 transition-all ease-linear hover:scale-110'
                    onClick={onClick}
                >
                    <ArrowRight />
                </button>
            </div>
        </>
    )
}
export { NextBtn }
