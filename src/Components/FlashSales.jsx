import React from 'react';
import Countdown from 'react-countdown';
import Semicolon from '../static/Images/semiclone.svg'

import FlashSaleItems from "./FlashSaleItems";
import Button from "./Button";
import RedHeader from "./RedHeader";
import RightAndLeftSwiperArrows from "./RightAndLeftSwiperArrows";
import {useSelector} from "react-redux";

export default function FlashSales(props) {

    const {flashSaleSwiper} = useSelector(selector => selector.swiperReducer);

    const renderer = ({days, hours, minutes, seconds, completed}) => {
        // Render a countdown
        return <div className={"flex items-center gap-[17px]"}>
            <div className={"flex flex-col"}>
                <p className={"text-[12px] font-bold"}>Days</p>
                {days.toString().length === 1 ? <p className={"text-[32px] font-bold"}>0{days}</p> :
                    <p className={"text-[32px] font-bold"}>{days}</p>}
            </div>
            <img className={"relative top-2"} alt={"semicolon"} src={Semicolon}/>

            <div className={"flex flex-col"}>
                <p className={"text-[12px] font-bold"}>Hours</p>
                {hours.toString().length === 1 ? <p className={"text-[32px] font-bold"}>0{hours}</p> :
                    <p className={"text-[32px] font-bold"}>{hours}</p>}
            </div>
            <img className={"relative top-2"} alt={"semicolon"} src={Semicolon}/>

            <div className={"flex flex-col"}>
                <p className={"text-[12px] font-bold"}>Minutes</p>
                {minutes.toString().length === 1 ? <p className={"text-[32px] font-bold"}>0{minutes}</p> :
                    <p className={"text-[32px] font-bold"}>{minutes}</p>}
            </div>
            <img className={"relative top-2"} alt={"semicolon"} src={Semicolon}/>

            <div className={"flex flex-col"}>
                <p className={"text-[12px] font-bold"}>Seconds</p>
                {seconds.toString().length === 1 ? <p className={"text-[32px] font-bold"}>0{seconds}</p> :
                    <p className={"text-[32px] font-bold"}>{seconds}</p>}
            </div>

        </div>
    };


    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col gap-[33px] max-w-[1300px]"}>
                <RedHeader text={"Today's"}/>
                <div className={"flex justify-between mr-[150px]"}>
                    <div className={"flex items-end"}>
                        <h2 className={"text-[36px] font-semibold mr-[89px]"}>Flash Sales</h2>
                        <Countdown renderer={renderer} date={Date.now() + 3 * 24 * 1000 * 3600}/>
                    </div>
                    <RightAndLeftSwiperArrows swiper={flashSaleSwiper}/>
                </div>
                <FlashSaleItems isUserAuthed={props.isUserAuthed}/>
                <div className={"flex justify-center mb-[60px] mr-[100px]"}>
                    <Button text={"View All Products"}/>
                </div>
                <div className={"border-none p-0 bg-gray-300 h-[1px] mb-[80px] mr-[130px]"}></div>
            </div>
        </div>
    );
}
