import React from 'react';

export default function CouponCodeTextField(props) {
    return (
        <input type={"text"} className={"py-[16px] pl-[24px] outline-none border-2 border-gray-700 rounded-[4px] min-w-[100px]"} {...props}
               placeholder={"Coupon Code"}/>
    );
}
