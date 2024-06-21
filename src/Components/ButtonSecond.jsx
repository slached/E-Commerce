import React from 'react';

export default function ButtonSecond(props) {
    return (
        <button
            className={`text-center text-[16px] px-[48px] py-[16px] bg-white rounded-[4px] border-2 border-gray-400 font-semibold min-w-[222px]`}>{props.text}</button>
    );
}
