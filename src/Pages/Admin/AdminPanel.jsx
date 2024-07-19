import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {baseUrl} from "../../static/baseUrl";
import Navigator from "../../Components/Admin/Navigator";
import {useDispatch} from "react-redux";
import {findAllImages} from "../../redux/Global";

export default function AdminPanel(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //look for is user has admin permission
    useEffect(() => {
        fetch(`${baseUrl}/getUserMe`, {
            method: "GET",
            credentials: "include",
            headers: {Cookie: document.cookies}
        }).then(res => res.json())
            .then(res => {
                //if user does not have valid token
                if (res.status !== 200) navigate("/admin")
                else {
                    dispatch(findAllImages())
                }

            })
            .catch(err => err)
    }, []);

    return (
        <div className={"flex"}>
            <Navigator/>
            <div className={"m-0 p-0 w-[1px] h-screen border-none bg-white"}/>
            <div className={"grow"}>
                <Outlet/>
            </div>
        </div>
    );
}
