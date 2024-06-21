import React, {useEffect, useState} from 'react';
import UpArrow from '../static/Images/up-arrow.svg'
import DownArrow from '../static/Images/down-arrow.svg'
import {baseUrl} from "../static/baseUrl";
import {useDispatch} from "react-redux";
import {getCartItems} from "../redux/UserSlice";

export default function QuantityInputField(props) {

    const dispatch = useDispatch()

    const [value, setValue] = useState(props.quantity)

    const changeInput = (e) => {
        if (e.target.value.length < 3) {
            if (parseInt(e.target.value) === 0) {
                setValue(1)
            } else {
                setValue(parseInt(e.target.value))
            }
        }
        e.target.value === "" && setValue(0)
    }

    useEffect(() => {
        //update amounts after each value changed
        updateProductAmounts()

    }, [value]);

    const updateProductAmounts = () => {
        fetch(`${baseUrl}/cart/update/${props.productId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                Cookie: document.cookie,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                quantity: value
            })
        })
            .then(res => res.json())
            .then(res => {
                //to refresh cart state after quantity changed
                dispatch(getCartItems({credentials: "include", headers: {Cookie: document.cookie,}}))
            })
            .catch(err => err)
    }

    return (
        <div className={"flex max-w-[72px] border-1 border-gray-400 py-[10px] rounded-[4px] px-[12px] items-center"}>
            <input onChange={(e) => changeInput(e)} maxLength="2" className={"max-w-[35px] outline-none"}
                   type={"number"}
                   value={value.toString()}/>

            <div className={"flex flex-col gap-[10px]"}>
                <img onClick={() => {
                    setValue(prevValue => {
                        if (prevValue + 1 < 99) return prevValue + 1
                        else return 99
                    })
                }} className={"w-[10px] relative right-[0.78px] cursor-pointer"} alt={"up arrow"} src={UpArrow}/>
                <img onClick={() => {
                    setValue(prevValue => {
                        if (prevValue - 1 > 0) return prevValue - 1
                        else return 1
                    })
                }} className={"w-[10px] cursor-pointer"} alt={"down arrow"} src={DownArrow}/>
            </div>
        </div>);
}
