import {useDispatch, useSelector} from "react-redux";
import {setColorTypes, setSizeTypes} from "../../../redux/Global";
import {Button} from "@nextui-org/react";
import {useEffect, useState} from "react";
import _ from "lodash";
import IconCancel from "../../../static/Images/icon-cancel.svg";

export default function SelectForColorAndSizeOptions(props) {

    const dispatch = useDispatch();
    const {colorTypes, sizeTypes} = useSelector(selector => selector.globalReducer)
    const [newItem, setNewItem] = useState({label: "", key: "", quantity: null},)

    const [colorOrSize, setColorOrSize] = useState()

    useEffect(() => {
        props.type === "color" ? setColorOrSize(colorTypes) : setColorOrSize(sizeTypes);
    }, [colorTypes, sizeTypes]);

    return (
        <div className={"flex flex-col rounded-2xl"}>
            <div className={"flex flex-col gap-[5px] rounded-md bg-white w-[200px]"}>
                <div className={"flex flex-col gap-[5px] px-5 py-4"}>
                    {colorOrSize?.map((item, index) => (
                        <div className={"flex justify-between items-center"}>
                            <img className={"cursor-pointer"} alt={"cross"} src={IconCancel} width={20} height={20} onClick={() => {
                                const newTypes = colorOrSize?.map((item) => item)
                                newTypes.splice(index, 1)
                                props.type === "color" ? dispatch(setColorTypes(newTypes)) : dispatch(setSizeTypes(newTypes));
                            }}/>
                            <p> {item.label}</p>
                            <input name={item.key} type={"text"} onChange={(e) => {
                                const updatedTypes = colorOrSize.map((item2, index) => {
                                    if (item.key === item2.key) {
                                        if (e.target.value.length === 0) return {...item2, quantity: 0}
                                        return {...item2, quantity: parseInt(e.target.value)}
                                    } else return item2
                                })
                                props.type === "color" ? dispatch(setColorTypes(updatedTypes)) : dispatch(setSizeTypes(updatedTypes));

                            }} value={item.quantity}
                                   className={"outline-none border border-gray-300 rounded-md p-3 text-center w-[45px] h-[35px]"}/>
                        </div>
                    ))}
                </div>
                <hr/>
                <div className={"flex justify-between mt-[10px] px-4 py-2 "}>
                    <input onChange={event => {
                        setNewItem(prevState => ({
                            ...prevState,
                            label: _.capitalize(event.target.value),
                            key: event.target.value.toLowerCase()
                        }))
                    }} className={"max-w-[120px] outline-none"}
                           placeholder={props.type === "color" ? "Add new color" : "Add new size"} type={"text"}/>
                    <Button onClick={() => {
                        const newTypes = colorOrSize?.map((item) => item)
                        newTypes.push(newItem)
                        props.type === "color" ? dispatch(setColorTypes(newTypes)) : dispatch(setSizeTypes(newTypes));
                    }} className={"min-w-[55px]"} variant={"bordered"} color="default">Add</Button>
                </div>
            </div>
        </div>
    );
}

