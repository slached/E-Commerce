import React from 'react';

export default function RedHeader(props) {
    return (
        <div className={"flex gap-[10px] items-center mr-[100px]"}>
            <div className={"bg-[#DB4444] rounded-[4px] w-[20px] h-[40px]"}></div>
            <p className={"text-[#DB4444] font-semibold"}>{props.text}</p>
        </div>
    );
}
