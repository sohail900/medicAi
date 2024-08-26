import React from 'react'
import Slider from 'react-slick'
import ReviewCarosal from './ReviewCarosal'
import { NextBtn } from './CustomBtns'
import dummyData from '../../../contents/dummyData.json'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const settings: any = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '90px',
    nextArrow: <NextBtn />,
    prevArrow: null,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                centerMode: false,
                centerPadding: '0px',
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: false,
                prevArrow: false,
                centerMode: false,
                centerPadding: '0px',
            },
        },
    ],
}
const Review: React.FC = () => {
    return (
        <>
            <section className='w-full px-16 mt-16 relative'>
                <div className='flex flex-col justify-center items-center'>
                    <div>
                        <p className='text_label text-primary-color mb-2 text-[1.2rem] uppercase font-medium'>
                            Testimonials
                        </p>
                        <h2 className='font-bold'>
                            Don't take our word for it
                        </h2>
                    </div>
                </div>
                <Slider {...settings}>
                    {dummyData.dmData.map((elem) => {
                        const {
                            clientName,
                            desc,
                            id,
                            label,
                            profileImg,
                            title,
                        } = elem
                        return (
                            <React.Fragment key={id}>
                                <ReviewCarosal
                                    clientName={clientName}
                                    desc={desc}
                                    id={id}
                                    label={label}
                                    profileImg={profileImg}
                                    title={title}
                                />
                            </React.Fragment>
                        )
                    })}
                </Slider>
            </section>
        </>
    )
}

export default Review
