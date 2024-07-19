import React from 'react';
import {NavLink} from "react-router-dom";

export default function Navigator(props) {
    return (
        <div className={"flex flex-col gap-4 p-5"}>
            <NavLink style={({isActive}) => {
                return (
                    isActive ? {
                        color: "#5C8590",
                        textDecoration: "underline",
                        textDecorationColor: "#5C8590",
                        textUnderlineOffset: "4px",
                        textDecorationThickness: "5px"
                    } : {color: "white"}
                )
            }} to={"uploadImage"}>Upload Image</NavLink>

            <NavLink style={({isActive}) => {
                return (
                    isActive ? {
                        color: "#5C8590",
                        textDecoration: "underline",
                        textDecorationColor: "#5C8590",
                        textUnderlineOffset: "4px",
                        textDecorationThickness: "5px"
                    } : {color: "white"}
                )
            }} to={"product"}>Product</NavLink>

            <NavLink style={({isActive}) => {
                return (
                    isActive ? {
                        color: "#5C8590",
                        textDecoration: "underline",
                        textDecorationColor: "#5C8590",
                        textUnderlineOffset: "4px",
                        textDecorationThickness: "5px"
                    } : {color: "white"}
                )
            }} to={"category"}>Category</NavLink>
        </div>
    );
}

