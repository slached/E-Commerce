import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Star from "../Global/Star";
import {addToCart, insertOrExtractFromWishlist} from "../../Services/UserServices";

import {getCartItems, getWishlistItems} from "../../redux/UserSlice";
import {useDispatch, useSelector} from "react-redux";

import FavoriteBubbleFull from "../../static/Images/in-wishlist.svg";
import FavoriteBubbleEmpty from "../../static/Images/not-in-wishlist.svg";

export default function PreviewModal(props) {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()
    const {wishlist} = useSelector(selector => selector.userReducer)
    const [isLoading, setIsLoading] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '</span>';
        },
    };

    const wishlistController = (product) => {
        insertOrExtractFromWishlist(product)
            .then(() => {
                //then getCartItem again
                dispatch(getWishlistItems({
                    credentials: "include", headers: {Cookie: document.cookie}
                }))
            })
    }


    return (
        <Modal
            size={"5xl"}
            backdrop="opaque"
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            radius="lg"
            classNames={{
                body: "py-[100px]",
                backdrop: "bg-white/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-white",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <ModalBody className={"flex flex-row"}>
                        <Swiper
                            modules={[Pagination]}
                            pagination={pagination}
                            spaceBetween={"30"}
                            className={"max-w-[300px] max-h-[500px]"}
                            slidesPerView={1}
                        >
                            {props.pAndI.images.map((value, index) => <SwiperSlide
                                key={"swiper modal image" + index}>
                                <img className={"w-full h-full"} alt={"main image"}
                                     src={value}/>

                            </SwiperSlide>)}
                        </Swiper>

                        <div className={"flex flex-col gap-3 mx-[50px]"}>
                            <h1 className={"text-[18px] font-bold"}>{props.pAndI.product.name}</h1>
                            <h3 className={"text-[24px] font-semibold"}>${props.pAndI.product.price}</h3>
                            <div className={"flex gap-2 items-center"}>
                                <Star pAndI={props.pAndI}/>
                                <p className={"text-[12px] font-semibold"}>{props.pAndI.product.stars}</p>
                            </div>
                        </div>

                        <div
                            className={"flex flex-col gap-[25px] border border-gray-200 rounded-lg p-3 px-[20px] h-fit"}>
                            <div className={"flex flex-col gap-1"}>
                                <p className={"text-[18px] font-semibold"}>Quantity</p>
                                <div className={"flex gap-[12px] items-center"}>
                                    <p className={"rounded-[100%] bg-gray-500/10 px-2 text-center cursor-pointer"}
                                       onClick={() => {
                                           setQuantity(prevState => prevState - 1 > 0 ? prevState - 1 : 1)
                                       }}>-</p>
                                    <p className={"rounded-full"}>{quantity}</p>
                                    <p className={"rounded-[100%] bg-gray-500/10 px-[6px] text-center cursor-pointer"}
                                       onClick={() => {
                                           setQuantity(prevState => prevState + 1)
                                       }}>+</p>
                                </div>
                            </div>
                            <button className={"rounded-full font-semibold bg-[#DB4444] text-white py-[12px]"}
                                    onClick={() => {
                                        //disable button till finish
                                        if (!isLoading && !isFinished) {
                                            setIsLoading(true)
                                            //add to cart service with quantity state
                                            addToCart({...props.pAndI, increaseQuantity: quantity})
                                                .then(() => {
                                                    setIsLoading(false)
                                                    setIsFinished(true)
                                                    setTimeout(() => {
                                                        setIsFinished(false)
                                                    }, 2000)
                                                    //then getCartItem again
                                                    dispatch(getCartItems({
                                                        credentials: "include",
                                                        headers: {Cookie: document.cookie}
                                                    }))
                                                })
                                        }
                                    }}>
                                {isLoading ?
                                    <div className={"flex justify-center"}><CircularProgress color="default" size={"sm"}
                                                                                             aria-label="Loading..."/>
                                    </div>
                                    : isFinished ? <p>Completed</p> : <p>Add To Cart</p>}
                            </button>

                            <div className={"flex gap-[10px]"}>
                                <button
                                    className={"w-[200px] rounded-full font-semibold bg-none text-black py-[8px] border border-gray-500"}>
                                    Show Details
                                </button>
                                <button
                                    className={"rounded-full font-semibold bg-none text-black py-[8px] px-[16px] border border-gray-500"}>
                                    <img onClick={() => {
                                        wishlistController(props.pAndI.product)
                                    }} className={"cursor-pointer"} alt={"img favorite"}
                                         src={wishlist?.find(e => e?.productId === props.pAndI.product._id) === undefined ? FavoriteBubbleEmpty : FavoriteBubbleFull}/>
                                </button>
                            </div>
                        </div>
                    </ModalBody>

                )}
            </ModalContent>
        </Modal>
    );
}
