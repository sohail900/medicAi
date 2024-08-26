import { FC } from 'react'
import aiIcon from '/assets/icons/ai_icon.svg'
import laptopIcon from '/assets/icons/lap_icon.svg'
import userIcon from '/assets/icons/user_icon.svg'
import PortfolioCard from './PortfolioCard'
const PortfolioCom: FC = () => {
    return (
        <>
            <section className='w-full px-16' id='portfolio'>
                <div className='flex flex-col justify-center items-center'>
                    <div>
                        <p className='text_label text-primary-color mb-2 text-[1.2rem] uppercase font-medium'>
                            Why Choose Us?
                        </p>
                        <h2 className='font-bold'>
                            Precision , Speed, Simplicity
                        </h2>
                    </div>
                </div>
                <div className='flex justify-center gap-14 mt-12 flex-wrap'>
                    <PortfolioCard
                        image={laptopIcon}
                        desc='Works flawlessly across all devices and browsers for your convenience.'
                        title='Seamless Integration'
                    />
                    <PortfolioCard
                        image={aiIcon}
                        desc='Every SOAP note is generated with precision & enhancing patient care.'
                        title='AI-Driven Accuracy'
                    />
                    <PortfolioCard
                        image={userIcon}
                        desc='Simply upload a document & let AI handle rest, with no complicated steps involved'
                        title='User-Friendly Interface'
                    />
                </div>
            </section>
        </>
    )
}

export default PortfolioCom
