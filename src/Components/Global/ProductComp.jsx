import React, {useEffect, useState} from 'react';
import {addToCart, insertOrExtractFromWishlist} from "../../Services/UserServices";

import FavoriteBubbleEmpty from "../../static/Images/not-in-wishlist.svg";
import FavoriteBubbleFull from "../../static/Images/in-wishlist.svg";
import EyeBubble from "../../static/Images/fill-eye.svg";

import Garbage from "../../static/Images/garbage-icon.svg";

import {Spinner, useDisclosure} from "@nextui-org/react";

import {SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";
import {getCartItems, getWishlistItems} from "../../redux/UserSlice";
import {deleteFromWishlist} from "../../Services/ProductServices";
import PreviewModal from "../HomePage/PreviewModal";
import Star from "./Star";

export default function ProductComp(props) {

    const dispatch = useDispatch()

    const [onOver, setOnOver] = useState(new Array(50).fill(false))
    const [isLoading, setIsLoading] = useState(new Array(50).fill(false))
    const [isFinished, setIsFinished] = useState(new Array(50).fill(false))

    const {wishlist} = useSelector(selector => selector.userReducer)

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

    const wishlistController = (product) => {
        insertOrExtractFromWishlist(product)
            .then(() => {
                //then getCartItem again
                dispatch(getWishlistItems({
                    credentials: "include", headers: {Cookie: document.cookie}
                }))
            })
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <SwiperSlide
            onMouseEnter={() => {
                setOnOver(prevState => prevState.map((value, index) => index === props.index ? true : value))
            }}
            onMouseLeave={() =>
                setOnOver(prevState => prevState.map(() => false))
            }>
            {/*Modal for review product*/}
            <PreviewModal pAndI={props.productAndImageObject} isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className={"flex flex-col gap-[15px] w-[270px]"}>
                <div>
                    {props.productAndImageObject.product.isDiscounted ?
                        <p className={"z-40 absolute top-7 left-4 p-[15px] text-[12px] text-center max-w-[55px] col-span-3 row-span-2 px-[12px] py-[4px] bg-[#DB4444] rounded-[4px] text-white mb-[11px]"}>
                            -{props.productAndImageObject.product.discountPercentage}%
                        </p> : null}
                    {props.isUserAuthed ?

                        <div style={onOver[props.index] ? {display: "block"} : {display: "none"}}
                             className={"z-40 absolute left-[225px] top-6 "}>
                            {props.type === "flashsales" ?
                                <div className={"flex flex-col gap-[8px]"}>
                                    <img onClick={() => {
                                        wishlistController(props.productAndImageObject.product)
                                    }} className={"cursor-pointer"} alt={"img favorite"}
                                        //this is trying to find if the product in wishlist or not
                                         src={wishlist?.find(e => e?.productId === props.productAndImageObject.product._id) === undefined ? FavoriteBubbleEmpty : FavoriteBubbleFull}/>
                                    <img onClick={onOpen} className={"cursor-pointer"} alt={"img ispect"}
                                         src={EyeBubble}/>
                                </div>
                                :
                                props.type === "wishlist" ?
                                    <img onClick={() => {
                                        deleteFromWishlist({
                                            credentials: "include",
                                            headers: {Cookie: document.cookie,},
                                            id: props.productAndImageObject.product._id,
                                            method: "DELETE"
                                        })
                                            .then(res => {
                                                dispatch(getWishlistItems({
                                                    credentials: "include",
                                                    headers: {Cookie: document.cookie}
                                                }));
                                            })
                                            .catch(err => err)
                                    }} className={"min-w-[34px] min-h-[34px] cursor-pointer"} src={Garbage}
                                         alt={"garbage"}/>
                                    :
                                    null
                            }
                        </div>
                        : null}
                </div>
                <div
                    className={"flex bg-[#F5F5F5] p-[49px] rounded-[4px] h-[250px] max-w-[270px] justify-center items-center"}>

                    {props.productAndImageObject?.images ?
                        //if multiple image contains (for detailed product page)
                        <img className={"max-w-[172px] max-h-[152px]"}
                             alt={props.productAndImageObject.product.name}
                             src={props.productAndImageObject.images[0].url}/>
                        :
                        <img className={"max-w-[172px] max-h-[152px]"}
                             alt={props.productAndImageObject.product.name}
                             src={props.productAndImageObject.image}/>}
                </div>
                {/*add to cart*/}
                <div>
                    {props.isUserAuthed ?
                        //is user signed in
                        isLoading[props.index] ?
                            //if it's on loading process
                            <div
                                className={"z-50 absolute bg-black top-[222px] w-[270px] rounded-[4px] py-[9px] cursor-pointer flex justify-center items-center gap-3"}>
                                <Spinner size={"sm"} color="default"/>
                                <p className={"text-center text-white "}>Loading</p>
                            </div>
                            :
                            //if it's not on loading process
                            isFinished[props.index] ?
                                //if it's not on loading process and finished (it's basically mean started and finished)
                                <div
                                    className={"z-50 absolute bg-green-700 top-[222px] w-[270px] rounded-[4px] py-[13px] cursor-pointer"}>
                                    <p className={"text-center text-white text-[12px] font-bold"}>
                                        Item added to your cart successfully.
                                    </p>
                                </div>
                                :
                                //if it's not on loading process and not finished (it's basically mean not clicked add to cart button yet)
                                <div style={onOver[props.index] ? {display: "block"} : {display: "none"}}
                                     className={"z-50 absolute bg-black top-[222px] w-[270px] rounded-[4px] py-[9px] cursor-pointer"}>
                                    <p className={"text-center text-white "}
                                       onClick={() => {
                                           isLoadingHandler(props.index)
                                           //add to cart
                                           addToCart(props.productAndImageObject)
                                               .then(() => {
                                                   //then getCartItem again
                                                   dispatch(getCartItems({
                                                       credentials: "include",
                                                       headers: {Cookie: document.cookie}
                                                   }))
                                               })
                                       }}>Add To Cart</p>
                                </div>
                        :
                        //is user not signed in
                        null}
                </div>
                {/* price, vote and stars field */}
                <div className={"flex flex-col gap-[8px] items-start"}>
                    <p className={"font-semibold cursor-pointer"}>{props.productAndImageObject.product.name}</p>
                    {props.productAndImageObject.product.isDiscounted ?
                        <div className={"flex gap-[12px] font-semibold"}>
                            <p className={"text-[#DB4444]"}>${parseInt(props.productAndImageObject.product.price) * (100 - parseInt(props.productAndImageObject.product.discountPercentage)) / 100}</p>
                            <p className={"text-[#7D8184] line-through"}>${parseInt(props.productAndImageObject.product.price)}</p>
                        </div>
                        :
                        <p className={"font-semibold text-[#DB4444]"}>${parseInt(props.productAndImageObject.product.price)}</p>
                    }
                    {props.isStarVoteActive &&
                        <div className={"flex gap-[5px] items-center"}>
                            <Star pAndI={props.productAndImageObject}/>
                            <p className={"text-[14px] text-[#7D8184]"}>({props.productAndImageObject.product.votes})</p>
                        </div>}
                </div>
            </div>
        </SwiperSlide>
    )
        ;
}
