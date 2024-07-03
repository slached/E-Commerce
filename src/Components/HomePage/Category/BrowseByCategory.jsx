import React, {useEffect, useState} from 'react';
import RedHeader from "../RedHeader";
import CategoryBox from "./CategoryBox";
import {baseUrl} from "../../../static/baseUrl";
import {CircularProgress} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import RightAndLeftSwiperArrows from "../../Global/RightAndLeftSwiperArrows";
import {setCategorySwiper} from "../../../redux/SwiperSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useSearchParams} from "react-router-dom";

export default function BrowseByCategory(props) {

    const dispatch = useDispatch()
    const {categorySwiper} = useSelector(selector => selector.swiperReducer)
    const [categoriesAndImages, setCategoriesAndImages] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        fetch(`${baseUrl}/category/getAll`, {
            method: "GET", credentials: "include", headers: {Cookies: document.cookie}
        })
            .then(res => res.json())
            .then(res => {
                res.status === 200 && setCategoriesAndImages(res.data)
            })
            .catch(err => err)
    }, []);

    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col gap-[30px]"}>
                <RedHeader text={"Categories"}/>
                <div className={"flex justify-between mr-[150px]"}>
                    <h2 className={"text-[36px] font-semibold mr-[89px]"}>Browse By Category</h2>
                    <RightAndLeftSwiperArrows swiper={categorySwiper}/>
                </div>
                <div className={"flex mt-[40px] mb-[70px]"}>
                    {
                        categoriesAndImages.length > 0 ?
                            <div className={"flex flex-col"}>
                                <Swiper
                                    loop={true}
                                    spaceBetween={30}
                                    slidesPerView={5}
                                    className={"max-w-[1300px] mb-[70px]"}
                                    onSwiper={(swiper) => {
                                        dispatch(setCategorySwiper(swiper))
                                    }}>
                                    {categoriesAndImages.map((item, index) => {

                                        return (
                                            <SwiperSlide>
                                                <Link to={{
                                                    pathname: "/product",
                                                    search: searchParams.get("language") ? `?language=${searchParams.get("language")}&query=${item.category.name.toLowerCase()}` : `?query=${item.category.name.toLowerCase()}`,
                                                }}>
                                                    <CategoryBox category={item.category.name}
                                                                 src={item.url}/>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <div className={"border-none p-0 bg-gray-300 h-[1px] mb-[80px] mr-[130px]"}></div>

                            </div>

                            :
                            <div className={"flex justify-center min-w-[1300px] py-[100px]"}>
                                <CircularProgress color={"default"} label="Loading..."/>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
