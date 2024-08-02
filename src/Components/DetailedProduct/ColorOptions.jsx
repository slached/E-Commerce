import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedColorType} from "../../redux/Global";

export default function ColorOptions(props) {

    const dispatch = useDispatch();
    const {selectedColor} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        //set default selected color
        dispatch(setSelectedColorType(props.colors[0]))
    }, [])

    return (
        <div className={"flex gap-[24px] mb-[8px]"}>
            <h2 className={"text-[20px]"}>Colours:</h2>
            <div className={"flex items-center gap-[8px]"}>
                {props.colors.map((color, i) => color === selectedColor ?
                    /*here is selected color style*/
                    <div key={i.toString() + "color"} className={"rounded-full border-3 border-black"}>
                        <div
                            style={/\d/.test(color.key) ? {backgroundColor: `#${color.key}`} : {backgroundColor: color.key}}
                            className={"rounded-full w-[20px] h-[20px] border-2 border-white cursor-pointer"}></div>
                    </div> :
                    /*here is not selected note that if color is hex code it detects and add # to it*/
                    <div onClick={() => {
                        dispatch(setSelectedColorType(color))
                    }} key={i.toString() + "color"}
                         style={/\d/.test(color.key) ? {backgroundColor: `#${color.key}`} : {backgroundColor: color.key}}
                         className={"rounded-full w-[20px] h-[20px] cursor-pointer"}></div>)}
            </div>
        </div>
    );
}
