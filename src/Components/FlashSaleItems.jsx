import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import FavoriteBubble from '../static/Images/Fill Heart.svg'
import EyeBubble from '../static/Images/Fill Eye.svg'

import FullStar from '../static/Images/full-star.svg'
import HalfStar from '../static/Images/star-half-filled.svg'
import EmptyStar from '../static/Images/empty-star.svg'

export default function FlashSaleItems(props) {

    const {productAndImage} = useSelector(selector => selector.productReducer)
    const [discountedProducts, setDiscountedProducts] = useState([])

    useEffect(() => {
        const discountedProducts = []
        productAndImage.forEach(value => {
            if (value.product.isDiscounted) {
                discountedProducts.push(value)
            }
        })
        setDiscountedProducts(discountedProducts)
    }, [productAndImage]);

    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={4}
            className={"max-w-[1300px] mb-[300px]"}>
            {discountedProducts.map((productAndImageObject, index) => {

                // 0 empty, 1 full and 0.5 is presents half star
                let starArr = []
                let startInt = parseFloat(productAndImageObject.product.stars)
                while (startInt > 0) {
                    if (startInt < 1) {
                        starArr.push(0.5)
                    } else starArr.push(1)
                    startInt--
                }
                //this fill rest of array with zero
                const amountOfFilledZero = 5 - starArr.length
                for (let i = 0; i < amountOfFilledZero; i++) starArr.push(0)

                return (<
                    SwiperSlide>
                    <div className={"flex flex-col gap-[15px]"}>
                        <div>
                            <p className={"z-40 absolute top-7 left-4 p-[15px] text-[12px] text-center max-w-[55px] col-span-3 row-span-2 px-[12px] py-[4px] bg-[#DB4444] rounded-[4px] text-white mb-[11px]"}>-{productAndImageObject.product.discountPercentage}%</p>
                            <div className={"flex flex-col gap-[8px] z-40 absolute left-[225px] top-6 "}>
                                <img alt={"img favorite"} src={FavoriteBubble}/>
                                <img alt={"img ispect"} src={EyeBubble}/>
                            </div>
                        </div>
                        <div
                            className={"flex bg-[#F5F5F5] p-[49px] rounded-[4px] h-[250px] max-w-[270px] justify-center items-center"}>
                            <img className={"max-w-[172px] max-h-[152px]"}
                                 alt={productAndImageObject.product.name}
                                 src={productAndImageObject.image.dataUrl}/>
                        </div>

                        <div className={"flex flex-col gap-[8px]"}>
                            <p className={"font-semibold"}>{productAndImageObject.product.name}</p>
                            <div className={"flex gap-[12px] font-semibold"}>
                                <p className={"text-[#DB4444]"}>${parseInt(productAndImageObject.product.price) * (100 - parseInt(productAndImageObject.product.discountPercentage)) / 100}</p>
                                <p className={"text-[#7D8184] line-through"}>${parseInt(productAndImageObject.product.price)}</p>
                            </div>
                            <div className={"flex gap-[3px]"}>
                                {starArr.map(value => {
                                    switch (value) {
                                        case 0:
                                            return <img alt={"empty star"} src={EmptyStar}/>
                                        case 1:
                                            return <img alt={"empty star"} src={FullStar}/>
                                        case 0.5:
                                            return <img alt={"empty star"} src={HalfStar}/>
                                    }
                                })}
                                <p className={"text-[14px] text-[#7D8184]"}>({productAndImageObject.product.votes})</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>)
            })}
        </Swiper>
    );
}
