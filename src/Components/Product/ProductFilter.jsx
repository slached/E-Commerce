import React, {useEffect} from 'react';
import PriceRange from "./PriceRange";
import {useSearchParams} from "react-router-dom";

export default function ProductFilter(props) {

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div>
            {/*if there is in browse all (without query parameter: means view all product) product there is no need to filter section*/}
            {searchParams.get("query") ?
                <div
                    className={"flex flex-col rounded-[4px] border border-gray-300 px-[20px] py-[20px] mr-[50px] min-w-[180px]"}>
                    <PriceRange/>
                </div>
                : null}

        </div>
    );
}

