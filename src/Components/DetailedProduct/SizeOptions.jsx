import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedSizeType} from "../../redux/Global";

export default function SizeOptions(props) {

    const dispatch = useDispatch();
    const {selectedSize} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        //set default selected size
        dispatch(setSelectedSizeType(props.sizes[0]))
    }, [])

    return (
        <div className={"flex gap-[24px] mb-[8px]"}>
            <h2 className={"text-[20px]"}>Size:</h2>
            <div className={"flex items-center gap-[8px]"}>
                {props.sizes.map((size, i) => size === selectedSize ?
                    /*here is selected size style*/
                    <div key={i.toString()}
                         className={"flex justify-center items-center rounded-md bg-[#DB4444] text-white w-[32px] h-[32px] text-[14px] cursor-pointer"}>{size.key.toUpperCase()}</div> :
                    /*here is not selected size*/
                    <div onClick={() => {
                        dispatch(setSelectedSizeType(size))
                    }} key={i.toString()}
                         className={"flex justify-center items-center rounded-md border-1 border-gray-500 w-[32px] h-[32px] text-[14px] cursor-pointer"}>{size.key.toUpperCase()}</div>)}
            </div>
        </div>
    );
}
