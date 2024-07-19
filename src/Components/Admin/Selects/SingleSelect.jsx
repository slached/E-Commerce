import React, {useEffect} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {setSelectedImage} from "../../../redux/Global";
import {useDispatch, useSelector} from "react-redux";

export default function SingleSelect(props) {

    const dispatch = useDispatch();
    const {selectedImage,allImages} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        dispatch(setSelectedImage(props?.selectedItem))
    }, []);

    return (
        <Select
            items={allImages}
            label="single select"
            variant="bordered"
            placeholder="Select an image"
            selectedKeys={selectedImage}
            className="max-w-xs"
            onSelectionChange={(e) => dispatch(setSelectedImage(e))}
        >
            {((item) => (<SelectItem key={item.key}>{item.label}</SelectItem>))}
        </Select>
    );
}
