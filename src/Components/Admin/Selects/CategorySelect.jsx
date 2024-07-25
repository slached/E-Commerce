import React, {useEffect} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {setSelectedCategories} from "../../../redux/Global";
import {useDispatch, useSelector} from "react-redux";

export default function CategorySelect(props) {

    const dispatch = useDispatch();
    const {selectedCategories, allCategories} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        dispatch(setSelectedCategories(props?.selectedCategories))

    }, [])

    return (
        <Select
            items={allCategories}
            placeholder="Select Categories"
            selectionMode="multiple"
            className="p-2 w-[150px]"
            selectedKeys={selectedCategories}
            onSelectionChange={(e) => dispatch(setSelectedCategories(e))}
        >
            {(item) => <SelectItem>{item.label}</SelectItem>}
        </Select>
    );
}

