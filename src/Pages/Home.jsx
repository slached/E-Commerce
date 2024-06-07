import React, {useEffect, useState} from 'react';
import {baseUrl} from "../static/baseUrl";
import {useNavigate} from "react-router-dom";
import UpperHomePage from "../Components/UpperHomePage";
import FlashSales from "../Components/FlashSales";
import {useDispatch} from "react-redux";
import {getProductAndImage} from "../redux/ProductSlice";

export default function Home(props) {

    const dispatch = useDispatch()
    //this useEffect is getting all productAndImages
    useEffect(() => {
        dispatch(getProductAndImage({
            credentials: "include", headers: {Cookie: document.cookie}
        }))

    }, []);


    return (<div className={"flex flex-col pl-[135px]"}>
        <UpperHomePage/>
        <FlashSales/>
    </div>);
}

