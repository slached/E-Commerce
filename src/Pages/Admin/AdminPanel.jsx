import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate} from "react-router-dom";

export default function AdminPanel(props) {

    const navigate = useNavigate();

    //look for is user has admin permission
    useEffect(() => {
        JSON.parse(localStorage.getItem("userMe"))?.role !== "admin" && navigate("/admin");
    }, []);

    return (
        <div className={"flex"}>
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
            </div>
            <div className={"m-0 p-0 w-[1px] h-screen border-none bg-white"}/>
            <div className={"grow"}>
                <Outlet/>
            </div>
        </div>
    );
}
