import React, {useEffect} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedImages} from "../../../redux/Global";

export default function SelectField(props) {

    const dispatch = useDispatch();
    const {selectedImages, allImages} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        dispatch(setSelectedImages(props?.selectedImages))
    }, [])

    return (
        <Select
            aria-label={"Image"}
            items={allImages}
            placeholder="Select images"
            selectionMode="multiple"
            className="p-2 w-[235px]"
            selectedKeys={selectedImages}
            onSelectionChange={(e) => dispatch(setSelectedImages(e))}
        >
            {(item) => <SelectItem>{item.label}</SelectItem>}
        </Select>
    );
}
