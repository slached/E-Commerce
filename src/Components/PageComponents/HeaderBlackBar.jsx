import React, {useEffect, useMemo, useState} from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image} from "@nextui-org/react";
import DropdownImg from '../../static/Images/lang-dropdown-arrow.svg'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

export default function HeaderBlackBar(props) {

    const location = useLocation()
    const navigator = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const languages = ["English", "Spanish", "French"];
    const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
        switch (searchParams.get("language")) {
            case "English":
                setSelectedKeys(new Set(["English"]))
                break
            case "Spanish":
                setSelectedKeys(new Set(["Spanish"]))
                break
            case "French":
                setSelectedKeys(new Set(["French"]))
                break
            default:
                setSelectedKeys(new Set(["English"]))
                break
        }
    }, []);

    useEffect(() => {
        if (selectedValue !== "English") navigator(`${location.pathname}?language=${selectedValue}`)
        else navigator(location.pathname)
    }, [selectedValue]);


    return (

        <div className={"flex bg-black text-white py-[15px] justify-around z-10 static"}>
            <div></div>
            <div className={"flex gap-[8px] items-center"}>
                <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <a href={""}><strong>ShopNow</strong></a>
            </div>

            <Dropdown>
                <DropdownTrigger>
                    <Button
                        color={""}
                        variant="light"
                        className="capitalize"
                    >
                        <p>{selectedValue}</p>
                        <Image alt={"dropdown"} src={DropdownImg}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    {languages.map((value) => {
                        return (<DropdownItem key={value}>{value}</DropdownItem>)
                    })}
                </DropdownMenu>
            </Dropdown>


        </div>);
}



