import React, {useEffect, useState} from 'react';
import Star from "../Global/Star";
import ColorOptions from "./ColorOptions";
import SizeOptions from "./SizeOptions";
import PlusIcon from "../../static/Images/plusIcon.svg";
import MinesIcon from "../../static/Images/minesIcon.svg";
import {useDispatch, useSelector} from "react-redux";
import {baseUrl} from "../../static/baseUrl";
import DeliveryFooter from "./DeliveryFooter";
import {useNavigate} from "react-router-dom";
import {getWishlistItems} from "../../redux/UserSlice";

import FavoriteBubbleEmpty from "../../static/Images/not-in-wishlist.svg";
import FavoriteBubbleFull from "../../static/Images/in-wishlist.svg";

export default function AllDetailsOfProduct(props) {
    const [quantity, setQuantity] = React.useState(1);
    const {wishlist} = useSelector(selector => selector.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const wishListHandler = async () => {
        const request = await fetch(`${baseUrl}/wishlist/insertAndExtract`, {
            method: "PATCH",
            credentials: "include",
            headers: {Cookie: document.cookie, "Content-Type": "application/json"},
            body: JSON.stringify({_id: props.product._id})
        });
        const response = await request.json()

        if (response.status === 403) {
            navigate("/login")
            window.location.reload()
        } else {
            dispatch(getWishlistItems({
                method: "GET",
                credentials: "include",
                headers: {Cookie: document.cookie},
            }))
        }
    }
    const buyButtonHandler = async () => {

    }

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <h2 className={"font-semibold text-[24px]"}>{props.product.name}</h2>
            <div className={"flex gap-[8px] items-center mb-[8px]"}>
                <Star pAndI={{product: props.product}}/>
                <p className={"mr-[8px] text-[14px] opacity-50"}>({props.product.votes} Reviews)</p>
                <hr className={"mr-[8px] w-[1px] bg-gray-500 h-[14px]"}/>
                {props.product.quantity > 0 ? <p className={"text-[#00FF66]"}>In Stock</p> :
                    <p className={"text-[#DB4444]"}>Out of Stock</p>}
            </div>
            <p className={"text-[14px] mb-[8px]"}>{props.product.description}</p>
            <hr className={"h-[2px] bg-gray-500 mb-[8px]"}/>
            {props.product.colorOptions.length > 0 && <ColorOptions colors={props.product.colorOptions}/>}
            {props.product.sizeOptions.length > 0 && <SizeOptions sizes={props.product.sizeOptions}/>}
            <div className={"flex gap-[16px] mb-[24px]"}>
                {/*increase and decrease button*/}
                <div className={"flex"}>
                    <div
                        onClick={() => {
                            setQuantity(prevState => prevState - 1 > 0 ? prevState - 1 : 0)
                        }}
                        className={"py-[15px] px-[11px] border-2 border-gray-400 rounded-l-md cursor-pointer flex justify-center items-center"}>
                        <img alt={"mines"} src={MinesIcon} className={"min-w-[16px]"}/>
                    </div>
                    <input onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity}
                           className={"text-[20px] outline-none max-w-[80px] font-semibold py-[8px] text-center border-t-2 border-b-2 border-gray-400 items-center"}/>
                    <div onClick={() => {
                        setQuantity(prevState => prevState + 1)
                    }}
                         className={"py-[15px] px-[13px] bg-[#DB4444] rounded-r-md cursor-pointer  flex justify-center items-center"}>
                        <img alt={"plus"} src={PlusIcon} className={"min-w-[16px]"}/>
                    </div>
                </div>
                {/*buy now button*/}
                <button onClick={() => buyButtonHandler()}
                        className={"bg-[#DB4444] rounded-md py-[10px] px-[48px] text-white"}>Buy Now
                </button>
                <img onClick={() => wishListHandler()} alt={"wishlist"}
                     src={wishlist?.find(e => e?.productId === props.product._id) === undefined ? FavoriteBubbleEmpty : FavoriteBubbleFull}
                     className={"border-2 rounded-md border-gray-400 px-[5px] cursor-pointer"}/>
            </div>
            <DeliveryFooter/>
        </div>
    );
}
