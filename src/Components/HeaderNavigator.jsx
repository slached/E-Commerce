import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import {Link, useLocation} from "react-router-dom";

export default function HeaderNavigator(props) {

    const location = useLocation()

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

    const setNavField = (tag) => {
        setSelectedField(tag)
    }

    useEffect(() => {
        console.log(selectedField)
    }, [selectedField]);
    return (<div className={"flex justify-between px-[135px] pt-[38px] pb-[16px]"}>
            <h3 className={"font-bold text-[24px]"}>Exclusive</h3>

            <div className={"flex gap-[48px]"}>
                {navFields.map((field, i) => {

                    if (props.isUserAuthed && field.tag === "Sign Up") {
                        //this if prevent render sign up navigation from header if any user already logged in
                        return null
                    } else {
                        return <Link onClick={() => setNavField(field.tag.toLowerCase())}
                                     style={selectedField === field.tag.toLowerCase() ? {
                                         textDecoration: "underline",
                                         textUnderlineOffset: "8px"
                                     } : null} to={field.ref}>{field.tag}</Link>
                    }

                })}
            </div>

            <SearchBar/>

            {props.isUserAuthed && <p className={"cursor-pointer"} onClick={() => props.logout()}>Logout</p>}
        </div>
    );
}

