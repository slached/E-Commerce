import React from 'react';
import BreadCrumb from "../Components/BreadCrumb";
import {useSelector} from "react-redux";
import QuantityInputField from "../Components/QuantityInputField";

export default function Cart(props) {

    const {cart} = useSelector(selector => selector.userReducer)

    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col py-[80px] px-[135px] gap-[80px] max-w-[1300px]"}>
                <BreadCrumb/>
                <div className={"mb-[60px] gap-[40px] flex flex-col"}>
                    <div className={"grid grid-cols-4 rounded-[4px] box-shadow-2 px-[40px] py-[24px]"}>
                        <p className={"justify-self-center"}>Product</p>
                        <p className={"justify-self-center"}>Price</p>
                        <p className={"justify-self-center"}>Quantity</p>
                        <p className={"justify-self-center"}>Subtotal</p>
                    </div>

                    {cart?.map((value, index) => {
                        return (
                            <div
                                className={"grid grid-cols-4 rounded-[4px] box-shadow-2 px-[40px] py-[24px] items-center"}>
                                <div className={"justify-self-start flex gap-[22px] items-center grow-[1]"}>
                                    <img className={"w-[45px] "} alt={"product image"} src={value.url}/>
                                    <p>{value.product.name}</p>
                                </div>
                                <p className={"justify-self-center"}>${value.product.price}</p>
                                <div className={"justify-self-center"}>
                                    <QuantityInputField productId={value.product._id} quantity={value.quantity}/>
                                </div>
                                <p className={"justify-self-center"}>${(value.product.price) * (value.quantity)}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}
