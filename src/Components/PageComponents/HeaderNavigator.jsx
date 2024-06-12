import React, {useEffect, useState} from 'react';
import SearchBar from "../SearchBar";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import UserDetails from "./UserDetails";

export default function HeaderNavigator(props) {

    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedField, setSelectedField] = useState("");
    const navFields = [
        {tag: "Home", ref: ""},
        {tag: "Contact", ref: "/contact"},
        {tag: "About", ref: "/about"},
        {tag: "Sign Up", ref: "/register"}
    ]

    useEffect(() => {
        if (location.pathname.substring(1).length === 0) setSelectedField("home")
        else if (location.pathname.substring(1) === "register") setSelectedField("sign up")
        else setSelectedField(location.pathname.substring(1))
    }, [])

    return (
        <div className={"flex justify-center px-[135px] pt-[38px] pb-[16px] gap-[70px]"}>
            <Link reloadDocument to={"/"}><h3 className={"font-bold text-[24px]"}>Exclusive</h3></Link>

            <div className={"flex gap-[48px]"}>
                {navFields.map((field, i) => {

                    if (props.isUserAuthed && field.tag === "Sign Up") {
                        //this if prevent render sign up navigation from header if any user already logged in
                        return null
                    } else {
                        return <Link key={i} onClick={() => setSelectedField(field.tag.toLowerCase())}
                                     style={selectedField === field.tag.toLowerCase() ? {
                                         textDecoration: "underline",
                                         textUnderlineOffset: "4px"
                                     } : null} to={{
                            pathname: field.ref,
                            search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                        }}>{field.tag}</Link>
                    }

                })}
            </div>

            <SearchBar/>

            {props.isUserAuthed && <UserDetails isUserAuthed={props.isUserAuthed} logout={props.logout}/>}
        </div>
    );
}

