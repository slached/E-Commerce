import React, {useEffect, useState} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedImages} from "../../redux/Global";

export default function SelectField(props) {

    const dispatch = useDispatch();
    const {selectedImages} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        dispatch(setSelectedImages(props?.selectedItems))
    }, [])

    return (
        <Select
            items={props.allItems}
            placeholder="Select images"
            selectionMode="multiple"
            className="p-2 max-w-[420px]"
            selectedKeys={selectedImages}
            onSelectionChange={(e) => dispatch(setSelectedImages(e))}
        >
            {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>
    );
}
