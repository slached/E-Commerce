import React, {useEffect, useState} from 'react';

import DropUpIcon from "../../static/Images/GoogleIcons/dropup.svg";
import DropdownIcon from "../../static/Images/GoogleIcons/dropdown.svg";
import SearchIcon from "../../static/Images/GoogleIcons/search.svg";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function PriceRange(props) {
    const [priceRange, setPriceRange] = useState(false);
    const [lowestPrice, setLowestPrice] = useState();
    const [highestPrice, setHighestPrice] = useState();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams()

    return (<div className={"flex flex-col gap-[10px]"}>
        <div
            className={"flex justify-between items-center "}
            onClick={() => {
                setPriceRange(prevState => !prevState)
            }}>
            <p className={"font-semibold text-[12px]"}>Price range</p>
            {priceRange ? <img loading={"lazy"} className={"hover:bg-gray-200 rounded-full"} alt={"dropup"}
                               src={DropUpIcon}/> :
                <img loading={"lazy"} className={"hover:bg-gray-200 rounded-full"} alt={"dropdown"}
                     src={DropdownIcon}/>}
        </div>
        {priceRange ? <div className={"flex flex-col"}>
            <div className={"flex gap-[5px] h-[35px]"}>
                <input
                    className={"rounded-[4px] border-2 border-gray-300 outline-none w-[55px] p-[3px] text-[12px] text-center focus:border-[#DB4444]"}
                    type={"text"} placeholder={"lowest"} value={lowestPrice}
                    onChange={e => setLowestPrice(e.target.value)}/>
                <input
                    className={"rounded-[4px] border-2 border-gray-300 outline-none w-[55px] p-[3px] text-[12px] text-center focus:border-[#DB4444]"}
                    type={"text"} placeholder={"highest"} value={highestPrice}
                    onChange={e => setHighestPrice(e.target.value)}/>
                {(highestPrice !== undefined || lowestPrice !== undefined) && (highestPrice || lowestPrice) ?
                    <button onClick={() => {

                        if (lowestPrice) {
                            if (highestPrice) {
                                searchParams.set("lowest", lowestPrice.toString())
                                searchParams.set("highest", highestPrice.toString())
                            } else {
                                searchParams.set("lowest", lowestPrice.toString())
                                searchParams.set("highest", "max")
                            }
                        } else {
                            searchParams.set("lowest", "min")
                            searchParams.set("highest", highestPrice.toString())
                        }

                        navigate(`/product?${searchParams}`)

                    }} className={"p-[5px] rounded-[5px] flex justify-center items-center bg-[#DB4444]"}>
                        <img alt={"search icon"} src={SearchIcon}/>
                    </button> : <button
                        className={"p-[5px] bg-gray-400 rounded-[5px] flex justify-center items-center"}>
                        <img alt={"search icon"} src={SearchIcon}/>
                    </button>}
            </div>

        </div> : null}
    </div>);
}
