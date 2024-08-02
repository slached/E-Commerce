import React from 'react';
import IconDelivery from "../../static/Images/icon-delivery.svg";
import IconReturn from "../../static/Images/Icon-return.svg";

export default function DeliveryFooter(props) {
    return (
        <div className={"flex flex-col border-2 border-gray-400 rounded-md py-[24px]"}>
            <div className={"flex gap-[22px] mx-[50px]"}>
                <div>
                    <img className={"min-w-[40px] min-h-[40px]"} src={IconDelivery} alt={"free delivery"}/>
                </div>
                <div className={"flex flex-col gap-[8px]"}>
                    <p>Free Delivery</p>
                    <p className={"text-[12px] underline decoration-1 underline-offset-2 z-50"}>Enter your postal
                        code for Delivery Availability</p>
                </div>
            </div>
            <div className={"m-0 p-0 h-[2px] bg-gray-400 my-[16px]"}></div>
            <div className={"flex gap-[22px] mx-[50px]"}>
                <div>
                    <img className={"min-w-[40px] min-h-[40px]"} src={IconReturn} alt={"free delivery"}/>
                </div>
                <div className={"flex flex-col gap-[8px]"}>
                    <p>Return Delivery</p>
                    <p className={"text-[12px] underline decoration-1 underline-offset-2 z-50"}>Free 30 Days
                        Delivery Returns. Details</p>
                </div>
            </div>
        </div>
    );
}

