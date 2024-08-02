import React, {useEffect, useState} from 'react';

import EmptyStar from "../../static/Images/empty-star.svg";
import FullStar from "../../static/Images/full-star.svg";
import HalfStar from "../../static/Images/star-half-filled.svg";
import {random} from "lodash";

export default function Star(props) {

    const [starArr, setStarArr] = useState([]);

    useEffect(() => {
        // 0 empty, 1 full and 0.5 is presents half star
        const starArr = []
        let startInt = parseFloat(props.pAndI.product.stars)
        while (startInt > 0) {
            if (startInt < 1) {
                starArr.push(0.5)
            } else starArr.push(1)
            startInt--
        }
        //this fill rest of array with zero
        const amountOfFilledZero = 5 - starArr.length
        for (let i = 0; i < amountOfFilledZero; i++) starArr.push(0)

        setStarArr(starArr)
    }, []);


    return (
        <div className={"flex gap-[3px]"}>
            {starArr.map(value => {
                switch (value) {
                    case 0:
                        return <img key={random(100000)} className={"h-[15px] w-[15px]"} alt={"empty star"} src={EmptyStar}/>
                    case 1:
                        return <img key={random(100000)} className={"h-[15px] w-[15px]"} alt={"full star"} src={FullStar}/>
                    case 0.5:
                        return <img key={random(100000)} className={"h-[15px] w-[15px]"} alt={"half star"} src={HalfStar}/>
                }
            })}
        </div>
    );
}