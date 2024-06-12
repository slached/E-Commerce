import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";

import FavoriteBubble from '../../static/Images/Fill Heart.svg'
import EyeBubble from '../../static/Images/Fill Eye.svg'
import FullStar from '../../static/Images/full-star.svg'
import HalfStar from '../../static/Images/star-half-filled.svg'
import EmptyStar from '../../static/Images/empty-star.svg'

import {setFlashSaleSwiper} from "../../redux/SwiperSlice";

import {addToCart} from "../../Services/UserServices";
import {Spinner} from "@nextui-org/react";

export default function FlashSaleItems(props) {

    const dispatch = useDispatch()
    const {productAndImage} = useSelector(selector => selector.productReducer)

    useEffect(() => {
        const discountedProducts = []
        productAndImage.forEach(value => {
            if (value.product.isDiscounted) {
                discountedProducts.push(value)
            }
        })
        setDiscountedProducts(discountedProducts)
    }, [productAndImage])

    const [discountedProducts, setDiscountedProducts] = useState([])
    const [onOver, setOnOver] = useState(new Array(50).fill(false))
    const [isLoading, setIsLoading] = useState(new Array(50).fill(false))
    const [isFinished, setIsFinished] = useState(new Array(50).fill(false))

    const mouseEnter = (swiperElementPosition) => {
        setOnOver(prevState => prevState.map((value, index) => index === swiperElementPosition ? true : value))
    }

    const mouseLeave = (swiperElementPosition) => {
        setOnOver(prevState => prevState.map((value, index) => index === swiperElementPosition ? false : value))
    }

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

    const isLoadingHandler = (swiperElementPosition) => {
        setIsLoading(prevState => prevState.map((value, index) => index === swiperElementPosition ? true : value))

        setTimeout(() => {
            // set the product index false back after loading finish
            setIsLoading(prevState => prevState.map((value, index) => index === swiperElementPosition ? false : value))
            // set true isFinished after is loading false
            // for something to finish first, it must have started earlier than the things it finishes before.
            setIsFinished(prevState => prevState.map((value, index) => index === swiperElementPosition ? true : value))
            setTimeout(() => {
                //set false to isFinished state after 1 sec because is finished must finish(to be set false) to customer could add into cart same item for later
                //is finished state used for item added to your cart message
                setIsFinished(prevState => prevState.map((value, index) => index === swiperElementPosition ? false : value))
            }, 2500)

        }, 750);
    }

    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={4}
            className={"max-w-[1300px] mb-[60px]"}
            onSwiper={(swiper) => {
                dispatch(setFlashSaleSwiper(swiper))
            }}>
            {discountedProducts.map((productAndImageObject, index) => {
                const starArr = starArrayCreator(productAndImageObject)
                return (<
                    SwiperSlide
                    onMouseEnter={() => mouseEnter(index)} onMouseLeave={() => mouseLeave(index)}>
                    <div className={"flex flex-col gap-[15px]"}>
                        <div>
                            <p className={"z-40 absolute top-7 left-4 p-[15px] text-[12px] text-center max-w-[55px] col-span-3 row-span-2 px-[12px] py-[4px] bg-[#DB4444] rounded-[4px] text-white mb-[11px]"}>-{productAndImageObject.product.discountPercentage}%</p>
                            {props.isUserAuthed ?
                                <div style={onOver[index] ? {display: "flex"} : {display: "none"}}
                                     className={"flex flex-col gap-[8px] z-40 absolute left-[225px] top-6 "}>
                                    <img className={"cursor-pointer"} alt={"img favorite"} src={FavoriteBubble}/>
                                    <img className={"cursor-pointer"} alt={"img ispect"} src={EyeBubble}/>
                                </div>
                                : null}
                        </div>
                        <div
                            className={"flex bg-[#F5F5F5] p-[49px] rounded-[4px] h-[250px] max-w-[270px] justify-center items-center"}>
                            <img className={"max-w-[172px] max-h-[152px]"}
                                 alt={productAndImageObject.product.name}
                                 src={productAndImageObject.image.dataUrl}/>
                        </div>

                        {props.isUserAuthed ?
                            //is user signed in
                            isLoading[index] ?
                                //if it's on loading process
                                <div
                                    className={"z-50 absolute bg-black top-[222px] w-[270px] rounded-[4px] py-[9px] cursor-pointer flex justify-center items-center gap-3"}>
                                    <Spinner size={"sm"} color="default"/>
                                    <p className={"text-center text-white "}>Loading</p>
                                </div>
                                :
                                //if it's not on loading process
                                isFinished[index] ?
                                    //if it's not on loading process and finished (it's basically mean started and finished)
                                    <div
                                        className={"z-50 absolute bg-green-700 top-[222px] w-[270px] rounded-[4px] py-[13px] cursor-pointer"}>
                                        <p className={"text-center text-white text-[12px] font-bold"}>
                                            Item added to your cart successfully.
                                        </p>
                                    </div>
                                    //if it's not on loading process and not finished (it's basically not started yet)
                                    :
                                    <div style={onOver[index] ? {display: "block"} : {display: "none"}}
                                         className={"z-50 absolute bg-black top-[222px] w-[270px] rounded-[4px] py-[9px] cursor-pointer"}>
                                        <p className={"text-center text-white "}
                                           onClick={() => {
                                               isLoadingHandler(index)
                                               addToCart(productAndImageObject)
                                           }}>Add To Cart</p>
                                    </div>
                            :
                            //is user not signed in
                            null}

                        <div className={"flex flex-col gap-[8px]"}>
                            <p className={"font-semibold cursor-pointer"}>{productAndImageObject.product.name}</p>
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
                                            return <img alt={"full star"} src={FullStar}/>
                                        case 0.5:
                                            return <img alt={"half star"} src={HalfStar}/>
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
