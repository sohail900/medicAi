import { Mail, PhoneCall } from 'lucide-react'
import InputField from './InputField'
const Contact = () => {
    return (
        <>
            <section
                className='px-16 mt-32 flex justify-center flex-col gap-8 md:flex-row'
                id='contact'
            >
                <div className='w-full md:w-[40%] mb-4 md:-mt-7'>
                    <div className='mb-3'>
                        <p className='text_label text-primary-color mb-2 text-[1.2rem] uppercase font-medium'>
                            Contact us
                        </p>
                        <h2 className='font-bold'>We’re Here to Help</h2>
                        <p className='text-tertiary-color mt-4 text-lg w-fulls lg:w-[70%]'>
                            Need assistance? Our support team is here to help.
                            Contact us via the form below, email, or call.
                        </p>
                    </div>
                    <div className='mt-8'>
                        <a
                            className='flex w-max items-center gap-3 text-lg mb-3'
                            href='mailto:example@gmail.com'
                        >
                            <Mail className='text-primary-color' />
                            example@gmail.com
                        </a>
                        <a
                            className='flex w-max items-center gap-3 text-lg'
                            href='mailto:example@gmail.com'
                        >
                            <PhoneCall className='text-primary-color' />
                            +1 234 567 8901
                        </a>
                    </div>
                </div>
                <InputField />
            </section>
        </>
    )
}

export default Contact
