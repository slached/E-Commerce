import {useEffect, useState} from 'react';
import ArrowDownIcon from '../../../static/Images/GoogleIcons/arrow_down.svg'
import {useDispatch, useSelector} from "react-redux";
import {setColorTypes} from "../../../redux/Global";

export default function SpecialSelectForColors(props) {

    const [onOpen, setOnOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const dispatch = useDispatch();
    const {colorTypes} = useSelector(selector => selector.globalReducer)

    useEffect(() => {
        console.log(colorTypes)
    }, [colorTypes]);

    return (
        <div className={"flex flex-col rounded-2xl"}>
            {/*Here is main section of select component*/}
            <div onClick={() => setOnOpen(prevState => !prevState)}
                 className={"flex rounded-md bg-white px-4 py-2 cursor-pointer hover:bg-gray-300"}>
                {selectedItems.length !== 0 ? <div>
                    {selectedItems.map((item, i) => (
                        <div className={"flex gap-[5px] justify-center items-center"}>
                            <p>{item}, </p>
                            <img alt={"dropdown"} src={ArrowDownIcon}/>
                        </div>
                    ))}
                </div> : <div className={"flex gap-[12px] justify-center items-center"}>
                    <p className={"text-sm"}>Select Colors</p>
                    <img alt={"dropdown"} src={ArrowDownIcon}/>
                </div>}
            </div>
            {/*if user click to the select component open all colors in the list*/}
            {onOpen &&
                <div className={"absolute z-50"}>
                    <div
                        className={"flex flex-col gap-[5px] rounded-md bg-white px-4 py-2 relative top-[50px] w-[200px]"}>
                        {colorTypes.map((item, index) => (
                            <div className={"flex justify-between"}>
                                <p> {item.label}</p>
                                <input name={item.key} type={"text"} onChange={(e) => {
                                    const newColorTypes = colorTypes.map((item2, index) => {
                                        if (item.key === item2.key) {
                                            if (e.target.value.length === 0) return {...item2, quantity: 0}
                                            return {...item2, quantity: parseInt(e.target.value)}
                                        } else return item2
                                    })
                                    dispatch(setColorTypes(newColorTypes))
                                }} value={item.quantity}
                                       className={"outline-none border border-gray-300 rounded-md p-3 text-center w-[40px] h-[35px]"}/>
                            </div>
                        ))}
                    </div>
                    <input value={5}
                           className={"outline-none border border-gray-300 rounded-md p-3 w-[20px] h-[20px] text-green-700"}/>
                </div>}
        </div>
    );
}

