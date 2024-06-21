import React, {useEffect, useState} from 'react';
import BreadCrumb from "../Components/BreadCrumb";
import {NavLink, Outlet, useLocation, useSearchParams} from "react-router-dom";

export default function MyAccount(props) {

    const [isInIndex, setIsInIndex] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams()
    const user = JSON.parse(localStorage.getItem("userMe"));
    const location = useLocation();

    useEffect(() => {
        setIsInIndex(location.pathname === '/account')
    }, [])

    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col rounded-[4px] px-[135px] max-w-[1300px] grow"}>
                <div className={"flex my-[80px] justify-between"}>
                    <BreadCrumb/>
                    <p className={"font-semibold flex gap-2"}>
                        <p>Welcome!</p>
                        <p className={"text-[#DB4444]"}>{user.name}</p>
                    </p>
                </div>
                <div className={"flex"}>
                    <div className={"grow-[1]"}>
                        <div className={"mb-[24px]"}>
                            <h2 className={"font-semibold mb-[16px]"}>Manage My Account</h2>
                            <div className={"flex flex-col gap-[8px] relative left-[50px] text-gray-500"}>
                                <NavLink reloadDocument
                                         style={isInIndex ? {color: "#DB4444"} : {}}
                                         to={{
                                             pathname: "/account",
                                             search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                                         }}>My Profile</NavLink>
                                <NavLink
                                    reloadDocument
                                    style={({isActive}) => {
                                        return isActive ? {color: "#DB4444"} : {};
                                    }}
                                    to={{
                                        pathname: "address",
                                        search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                                    }}>Address Book</NavLink>
                                <NavLink
                                    reloadDocument
                                    style={({isActive}) => {
                                        return isActive ? {color: "#DB4444"} : {};
                                    }}
                                    to={{
                                        pathname: "payment",
                                        search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                                    }}>My Payment Options</NavLink>
                            </div>
                        </div>
                        <div className={"mb-[24px]"}>
                            <h2 className={"font-semibold mb-[16px]"}>My Orders</h2>
                            <div className={"flex flex-col gap-[8px] relative left-[50px] text-gray-500"}>
                                <NavLink
                                    reloadDocument
                                    style={({isActive}) => {
                                        return isActive ? {color: "#DB4444"} : {};
                                    }} to={{
                                    pathname: "returns",
                                    search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                                }}>My Returns</NavLink>
                                <NavLink
                                    reloadDocument
                                    style={({isActive}) => {
                                        return isActive ? {color: "#DB4444"} : {};
                                    }} to={{
                                    pathname: "cancellations",
                                    search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                                }}>My Cancellations</NavLink>
                            </div>
                        </div>
                        <div>
                            <h2 className={"font-semibold mb-[16px]"}>My WishList</h2>
                            <div className={"flex flex-col gap-[8px] relative left-[50px] text-gray-500"}>

                            </div>
                        </div>
                    </div>

                    <div className={"grow-[3]"}>
                        <Outlet context={user}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
