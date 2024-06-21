import React, {useEffect} from 'react';
import WishList from '../static/Images/whislist.svg'
import Cart from '../static/Images/cart.svg'
import UserIcon from '../static/Images/default-user-profile-image.svg'

import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {IconCancel, IconLogout, IconMallBag, IconStar, IconUser} from "../static/SvgIcons";
import {useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

export default function UserDetails(props) {

    const {cart, wishlist} = useSelector(selector => selector.userReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigator = useNavigate()
    return (<div className={"flex gap-[20px] items-center"}>
        <div>
            <div className={"absolute"}>
                {wishlist?.length !== 0 ?
                    <p className={"relative left-[20px] bottom-[2px] bg-[#DB4444] rounded-[100%] text-[12px] text-white h-[16px] w-[16px] text-center"}>{wishlist?.length}</p> : null}
            </div>
            <Link reloadDocument to={{
                pathname: "wishlist",
                search: searchParams.get("language") && `?language=${searchParams.get("language")}`
            }}>
                <img className={"min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]"} src={WishList}
                     alt={"wishlist"}/>

            </Link>
        </div>
        <div>
            <div className={"absolute"}>
                {cart?.length !== 0 ?
                    <p className={"relative left-[20px] bottom-[2px] bg-[#DB4444] rounded-[100%] text-[12px] text-white h-[16px] w-[16px] text-center"}>{cart?.length}</p> : null}
            </div>
            <Link reloadDocument to={{
                pathname: "cart",
                search: searchParams.get("language") && `?language=${searchParams.get("language")}`
            }}><img className={"min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]"} src={Cart}
                    alt={"cart"}/></Link>
        </div>
        <Dropdown
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 pl-[27px] pr-[12px] bg-gradient-to-t from-gray-500/60 to-gray-300/50",
            }}
            radius={"sm"} size={"lg"} placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered={false}
                    as="button"
                    className="transition-transform min-w-[40px]"
                    src={UserIcon}
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Actions" variant="solid">
                <DropdownItem startContent={<IconUser/>} key="manage_account">
                    <Link reloadDocument to={{
                        pathname: "/account",
                        search: searchParams.get("language") && `?language=${searchParams.get("language")}`,
                    }}> Manage My Account</Link>
                </DropdownItem>
                <DropdownItem startContent={<IconMallBag/>} key="my_order">My Order</DropdownItem>
                <DropdownItem startContent={<IconCancel/>} key="my_cancellations">
                    My Cancellations
                </DropdownItem>
                <DropdownItem startContent={<IconStar/>} key="my_reviews">My Reviews</DropdownItem>
                <DropdownItem onClick={() => {
                    props.logout()
                    navigator("/")
                }} startContent={<IconLogout/>} key="logout"
                              color="danger">
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>);
}
