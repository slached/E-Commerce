import React, {useState} from 'react';
import RightArrow from '../../static/Images/menu-dropdown-arrow.svg'
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import IphoneSwiperImage from '../../static/Images/SwiperImages/iphoneImage.svg'
import JBLSpeaker from '../../static/Images/SwiperImages/jblSpeaker.svg'

import DeactivePoint from '../../static/Images/SwiperImages/swiperPointDeactive.svg'
import ActivePoint from '../../static/Images/SwiperImages/swiperPointActive.svg'
import {Link} from "react-router-dom";

export default function UpperHomePage(props) {

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const sliderImages = [
        {image: IphoneSwiperImage, href: "/"},
        {image: JBLSpeaker, href: "/"},
    ]

    return (
        <div className={"flex justify-center mb-[140px] mr-[100px]"}>
            <div className={"flex flex-col gap-[16px] mt-[40px] mr-[16px]"}>
                <div className={"flex justify-between gap-[51px]"}>
                    <p>Woman’s Fashion</p>
                    <img className={"max-w-[24px]"} alt={"right arrow"} src={RightArrow}/>
                </div>
                <div className={"flex justify-between gap-[51px]"}>
                    <p>Men’s Fashion</p>
                    <img className={"max-w-[24px]"} alt={"right arrow"} src={RightArrow}/>
                </div>
                <p>Electronics</p>
                <p>Home & Lifestyle</p>
                <p>Medicine</p>
                <p>Sports & Outdoor</p>
                <p>Baby’s & Toys</p>
                <p>Groceries & Pets</p>
                <p>Health & Beauty</p>
            </div>
            <div className={"border-none m-0 p-0 bg-gray-200 min-w-[1px]"}></div>
            <div className={"flex flex-col mt-[40px] ml-[45px]"}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    onSlideChange={(e) => {
                        setActiveImageIndex(e.activeIndex)
                    }}
                    className={"w-[900px] h-[350px]"}>
                    {sliderImages.map((value, index) => {

                        return (<
                                SwiperSlide>
                                <Link to={value.href}><img alt={index.toString()}
                                                           src={value.image}/></Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className={"flex justify-center relative bottom-7 text-white z-40 gap-[11px]"}>
                    {sliderImages.map((value, index) => {
                        if (activeImageIndex === index) return <img className={"bg-[#DB4444] rounded-[100%]"}
                                                                    alt={"point"} src={ActivePoint}/>
                        else return <img alt={"point"} src={DeactivePoint}/>
                    })}
                </div>
            </div>

        </div>
    );
}
