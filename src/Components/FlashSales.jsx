import React from 'react';
import Countdown from 'react-countdown';
import Semicolon from '../static/Images/Semiclone.svg'
import RightButton from '../static/Images/Fill with Right Arrow.svg'
import LeftButton from '../static/Images/Fill With Left Arrow.svg'
import FlashSaleItems from "./FlashSaleItems";

export default function FlashSales(props) {

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
        <div className={"flex flex-col gap-[33px]"}>
            <div className={"flex gap-[10px] items-center"}>
                <div className={"bg-[#DB4444] rounded-[4px] w-[20px] h-[40px]"}></div>
                <p className={"text-[#DB4444] font-semibold"}>Today's</p>
            </div>
            <div className={"flex justify-between"}>
                <div className={"flex items-end"}>
                    <h2 className={"text-[36px] font-semibold mr-[86px]"}>Flash Sales</h2>
                    <Countdown renderer={renderer} date={Date.now() + 3 * 24 * 1000 * 3600}/>
                </div>
                <div className={"flex gap-[12px] mr-[100px] mb-[30px]"}>
                    <img height={"46px"} width={"46px"} alt={"left button"} src={LeftButton}/>
                    <img height={"46px"} width={"46px"} alt={"right button"} src={RightButton}/>
                </div>
            </div>
            <FlashSaleItems/>
        </div>
    );
}
