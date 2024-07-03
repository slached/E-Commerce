import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";

import {setFlashSaleSwiper} from "../../../redux/SwiperSlice";
import ProductComp from "../../Global/ProductComp";
import {CircularProgress} from "@nextui-org/react";

export default function FlashSaleItems(props) {

    const dispatch = useDispatch()

    const {discountedProducts} = useSelector(selector => selector.productReducer)

    const starArrayCreator = (productAndImageObject) => {
        // 0 empty, 1 full and 0.5 is presents half star
        const starArr = []
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

        return starArr
    }

    return (
        <div>
            {discountedProducts?.length > 0 ?
                <Swiper
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={4}
                    className={"max-w-[1300px] mb-[60px]"}
                    onSwiper={(swiper) => {
                        dispatch(setFlashSaleSwiper(swiper))
                    }}>
                    {discountedProducts?.map((productAndImageObject, index) => {
                        const starArr = starArrayCreator(productAndImageObject)
                        return <SwiperSlide>
                            <ProductComp
                                productAndImageObject={productAndImageObject}
                                starArr={starArr}
                                index={index}
                                isUserAuthed={props.isUserAuthed}
                                isStarVoteActive={true}
                                type={"flashsales"}
                            />
                        </SwiperSlide>
                    })}
                </Swiper>
                :
                <div className={"flex justify-center min-w-[1300px] py-[100px]"}>
                    <CircularProgress color={"default"} label="Loading..."/>
                </div>
            }
        </div>
    );
}
