import React from 'react';

export default function AboutComponent(props) {

    return (
        <div>
            {props.type === 1 ? <div
                    className={"flex flex-col py-[30px] items-center border border-gray-500 rounded-[4px]"}>
                    <img loading={"lazy"} alt={"img"} src={props.image} className={"mb-[24px]"}/>
                    <h1 className={"mb-[12px] text-[32px] font-bold"}>{props.value}</h1>
                    <p className={"text-center"}>{props.text}</p>
                </div>
                :
                props.type === 2 ?
                    <div
                        className={"flex flex-col py-[30px] items-center rounded-[4px] bg-[#DB4444]"}>
                        <img loading={"lazy"} alt={"img"} src={props.image} className={"mb-[24px]"}/>
                        <h1 className={"mb-[12px] text-[32px] font-bold text-white"}>{props.value}</h1>
                        <p className={"text-white"}>{props.text}</p>
                    </div>
                    :
                    <div className={"flex flex-col items-center"}>
                        <img loading={"lazy"} alt={"img"} src={props.image} className={"mb-[24px]"}/>
                        <h1 className={"mb-[8px] text-[20px] font-semibold"}>{props.value}</h1>
                        <p className={"text-[14px]"}>{props.text}</p>
                    </div>
            }
        </div>
    );
}
