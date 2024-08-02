import React from 'react';
import {baseUrl} from "../../static/baseUrl";
import {useLoaderData} from "react-router-dom";
import ChangingImages from "../../Components/DetailedProduct/ChangingImages";
import BreadCrumb from "../../Components/Global/BreadCrumb";
import AllDetailsOfProduct from "../../Components/DetailedProduct/AllDetailsOfProduct";

export default function ProductDetails(props) {

    const data = useLoaderData()

    return (
        <div className={"flex justify-center mt-[80px] mx-[135px]"}>
            <div className={"flex flex-col gap-[80px] max-w-[1300px] "}>
                <BreadCrumb currentItemName={data.product.name}/>
                <div className={"flex gap-[70px] mb-[140px]"}>
                    <ChangingImages images={data.images} product={data.product}/>
                    <AllDetailsOfProduct images={data.images} product={data.product}/>
                </div>
            </div>
        </div>
    );
}

export const oneProductLoader = async ({params}) => {
    const data = await fetch(`${baseUrl}/product/getOne/${params.id}`)
    const res = await data.json()

    if (res.status === 200) {
        return {product: res.product, images: res.images}
    } else {
        return res.err
    }
}