import React from 'react';

export default function Button(props) {
    return (
        <button className={"text-white text-center text-[16px] px-[48px] py-[16px] bg-[#DB4444] rounded-[4px]"}>{props.text}</button>
    );
}
