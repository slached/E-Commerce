import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button2 from "../../Components/Global/ButtonSecond";
import {useOutletContext} from "react-router-dom";
import {getProductAndImageWishlist} from "../../redux/ProductSlice";
import ProductComp from "../../Components/Global/ProductComp";
import RedHeader from "../../Components/HomePage/RedHeader";
import {transferIntoCart} from "../../Services/ProductServices";
import {getCartItems, getWishlistItems} from "../../redux/UserSlice";

export default function Wishlist(props) {
    const {wishlist} = useSelector(selector => selector.userReducer);
    const {productAndImageWishlist} = useSelector(selector => selector.productReducer);

    const isAuthed = useOutletContext()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductAndImageWishlist({credentials: "include", headers: {Cookie: document.cookie}}));
    }, [wishlist])

    return (
        <div className={"flex justify-center"}>
            <div className={"mt-[80px] mx-[135px] flex flex-col gap-[60px] max-w-[1300px] min-w-[800px]"}>
                {wishlist?.length !== 0 ?
                    <div className={"flex flex-col gap-[60px] mb-[20px]"}>
                        <div className={"flex justify-between items-center"}>
                            <p className={"text-[20px] font-medium"}>Wishlist ({wishlist?.length})</p>
                            <div onClick={() => {
                                transferIntoCart({
                                    method: "POST",
                                    credentials: "include",
                                    headers: {Cookie: document.cookie}
                                })
                                    .then(res => {
                                        dispatch(getCartItems({
                                            credentials: "include",
                                            headers: {Cookie: document.cookie}
                                        }))
                                        dispatch(getWishlistItems({
                                            credentials: "include",
                                            headers: {Cookie: document.cookie}
                                        }))
                                    })
                                    .catch(err => err)
                            }}>
                                <Button2 text={"Move All To Bag"}/>
                            </div>
                        </div>
                        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[30px]"}>
                            {productAndImageWishlist?.map((productAndImage, index) => <ProductComp
                                    productAndImageObject={productAndImage}
                                    index={index}
                                    isUserAuthed={isAuthed}
                                    isStarVoteActive={false}
                                    type={"wishlist"}
                                />
                            )}
                        </div>
                    </div>
                    :
                    <p className={"text-[30px] font-bold text-center mb-[60px]"}>There is no item in wishlist!</p>}

                <div className={"flex justify-between "}>
                    <RedHeader text={"Just For You"}/>
                    <Button2 text={"See All"}/>
                </div>

                {/* its only test for now */}
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] mb-[140px]"}>
                    {[{
                        product: {
                            "_id": "6669c481a3a46c0180430d73",
                            "imageId": "6669c41ba3a46c0180430d68",
                            "name": "Gucci duffle bag",
                            "price": "1160",
                            "type": "bag",
                            "quantity": "16",
                            "votes": "0",
                            "stars": "0",
                            "isDiscounted": true,
                            "discountPercentage": "35",
                        },
                        image: ""
                    },
                        {
                            product: {
                                "_id": "6669c553a3a46c0180430d7f",
                                "imageId": "6669c429a3a46c0180430d6e",
                                "name": "AK-900 Wired Keyboard",
                                "price": "1160",
                                "type": "keyboard",
                                "quantity": "455",
                                "votes": "0",
                                "stars": "0",
                                "isDiscounted": true,
                                "discountPercentage": "35"
                            },
                            image: ""
                        }
                    ].map((productAndImage, index) => <ProductComp
                            productAndImageObject={productAndImage}
                            index={index}
                            isUserAuthed={isAuthed}
                            isStarVoteActive={true}
                            starArr={[0, 0, 0, 0, 0]}
                            type={"userrelateditems"}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}
