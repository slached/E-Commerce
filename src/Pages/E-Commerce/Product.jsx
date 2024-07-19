import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {baseUrl} from "../../static/baseUrl";
import {useLoaderData, useOutletContext, useSearchParams} from "react-router-dom";
import ProductComp from "../../Components/Global/ProductComp";
import BreadCrumb from "../../Components/Global/BreadCrumb";
import ProductFilter from "../../Components/Product/ProductFilter";

export default function Product(props) {

    const responseFromDb = useLoaderData()
    const isUserAuthed = useOutletContext()

    const [searchParams] = useSearchParams()
    // this will refresh page after each time search params change so basically after each query and reload page cause trigger
    // the loader and re request with query params
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (firstUpdate.current) {
            window.location.reload()
            return
        }
        firstUpdate.current = true
    }, [searchParams])

    return (
        <div className={"flex justify-center"}>
            {responseFromDb.status === 200 ?
                <div
                    className={"flex flex-col max-w-[1300px] my-[40px]"}>
                    <div className={"mb-[30px]"}><BreadCrumb/></div>
                    <div className={"flex"}>
                        <ProductFilter/>
                        <div
                            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[35px]"}>
                            {
                                responseFromDb.products.length > 0 ?
                                    responseFromDb.products.map((product, index) => {
                                        return (
                                            <ProductComp
                                                productAndImageObject={product}
                                                index={index}
                                                isUserAuthed={isUserAuthed}
                                                isStarVoteActive={false}
                                                type={"allProducts"}
                                            />
                                        )
                                    })
                                    : <p>loading...</p>
                            }
                        </div>
                    </div>
                </div>
                : <p className={"text-[24px] text-red-500 p-[300px]"}>Error Message {responseFromDb.message}</p>}
        </div>
    );
}

export const productLoader = async ({params, request}) => {

    const location = new URL(request.url)

    const query = location.searchParams.get("query")

    let allProductsWithImages

    if (query !== null) {
        const pAndI = await fetch(`${baseUrl}${location.pathname}/getAllWithImage?query=${query}`, {
            credentials: "include",
            headers: {Cookie: document.cookie},
        })
        allProductsWithImages = await pAndI.json()
    } else {
        const pAndI = await fetch(`${baseUrl}${location.pathname}/getAllWithImage`, {
            credentials: "include",
            headers: {Cookie: document.cookie},
        })
        allProductsWithImages = await pAndI.json()
    }

    if (allProductsWithImages.status !== 200) return {message: allProductsWithImages.message, status: 400}
    return {products: allProductsWithImages.products, status: 200}


}