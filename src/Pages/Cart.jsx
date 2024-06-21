import React, {useEffect, useState} from 'react';
import BreadCrumb from "../Components/BreadCrumb";
import {useDispatch, useSelector} from "react-redux";
import QuantityInputField from "../Components/QuantityInputField";
import DeleteFromCartIcon from '../static/Images/icon-cancel.svg'
import {baseUrl} from "../static/baseUrl";
import {getCartItems} from "../redux/UserSlice";
import Button from "../Components/Button";
import ButtonSecond from "../Components/ButtonSecond";
import CouponCodeTextField from "../Components/CouponCodeTextField";
import {Link} from "react-router-dom";

export default function Cart(props) {

    const {cart} = useSelector(selector => selector.userReducer)

    const [showDeleteFromCartIcon, setShowDeleteFromCartIcon] = useState(new Array(50).fill(false))
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const dispatch = useDispatch()

    const sendDeleteRequest = (productId) => {
        fetch(`${baseUrl}/cart/delete/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {Cookies: document.cookie, 'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(res => {
                //console.log(res)
                dispatch(getCartItems({credentials: "include", headers: {Cookie: document.cookie,}}))
            })
            .catch(err => err)
    }

    useEffect(() => {
        //reset subtotal
        setSubtotal(0)
        //calc subtotal
        cart?.forEach(value => {
            setSubtotal(prevState => prevState + (value.quantity * value.product.price))
        })
    }, [cart])

    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col py-[80px] px-[135px] "}>
                <BreadCrumb/>

                {cart?.length !== 0 ?
                    <div className={"mt-[80px] flex flex-col gap-[40px]"}>
                        <div className={"gap-[40px] flex flex-col min-w-[600px]"}>
                            <div
                                className={"grid grid-cols-4 rounded-[4px] box-shadow-2 px-[40px] py-[24px] font-semibold"}>
                                <p className={"justify-self-start"}>Product</p>
                                <p className={"justify-self-center"}>Price</p>
                                <p className={"justify-self-center"}>Quantity</p>
                                <p className={"justify-self-center"}>Subtotal</p>
                            </div>
                        </div>

                        {cart?.map((value, index) => {
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setShowDeleteFromCartIcon(prevState => prevState.map((value1, index1) => index === index1 ? true : value1))
                                    }}
                                    onMouseLeave={() => {
                                        setShowDeleteFromCartIcon(prevState => prevState.map((value1, index1) => index === index1 ? false : value1))
                                    }}
                                    className={"grid grid-cols-4 rounded-[4px] box-shadow-2 px-[40px] py-[24px] items-center"}>
                                    <div className={"justify-self-start flex gap-[22px] items-center grow-[1]"}>
                                        {showDeleteFromCartIcon[index] &&
                                            <div className={"absolute z-50"}>
                                                <img className={"relative bottom-[15px] right-[10px] cursor-pointer"}
                                                     alt={"delete cart item"}
                                                     src={DeleteFromCartIcon}
                                                     onClick={() => sendDeleteRequest(value.product._id)}
                                                />
                                            </div>
                                        }
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

                        <Link to={"/"}>
                            <ButtonSecond text={"Return To Shop"}/>
                        </Link>

                        <div className={"mt-[40px] flex justify-between"}>
                            <div className={"flex gap-[16px] max-h-[56px]"}>
                                <CouponCodeTextField/>
                                <Button text={"Apply Coupon"}/>
                            </div>
                            <div
                                className={"flex flex-col px-[24px] py-[32px] border-3 border-gray-600 rounded-[4px] w-[470px]"}>
                                <h3 className={"text-[20px] mb-[24px] font-semibold"}>Cart Total</h3>
                                <div className={"flex flex-col gap-[16px]"}>
                                    <div className={"flex justify-between"}>
                                        <p>Subtotal:</p>
                                        <p>${subtotal}</p>
                                    </div>
                                    <div className={"p-0 m-0 border-none h-[1px] bg-gray-300"}/>
                                    <div className={"flex justify-between"}>
                                        <p>Shipping:</p>
                                        <p>Free</p>
                                    </div>
                                    <div className={"p-0 m-0 border-none h-[1px] bg-gray-300"}/>
                                    <div className={"flex justify-between"}>
                                        <p>Total:</p>
                                        <p>${subtotal + shipping}</p>
                                    </div>

                                    <div className={"flex justify-center"}>
                                        <Button text={"Process to checkout"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <div>
                        <p className={"text-[30px] mb-[230px]"}>There is no item to shown in your cart.</p>
                    </div>
                }

            </div>
        </div>
    );
}
