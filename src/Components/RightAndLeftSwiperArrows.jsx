import React from 'react';
import LeftButton from "../static/Images/Fill With Left Arrow.svg";
import RightButton from "../static/Images/Fill with Right Arrow.svg";
import {useSelector} from "react-redux";

export default function RightAndLeftSwiperArrows(props) {

    const {flashSaleSwiper} = useSelector(select => select.swiperReducer)

    return (
        <div className={"flex gap-[12px] mb-[30px]"}>
            <img onClick={() => {
                flashSaleSwiper.slidePrev()
            }} height={"46px"} width={"46px"} alt={"left button"} className={"cursor-pointer"}
                 src={LeftButton}/>
            <img onClick={() => {
                flashSaleSwiper.slideNext()
            }} height={"46px"} width={"46px"} alt={"right button"} className={"cursor-pointer"}
                 src={RightButton}/>
        </div>
    );
}
