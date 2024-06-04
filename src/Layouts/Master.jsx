import React from 'react';
import '../static/Style/Global.css'
import Header from "./Header";
import Footer from "./Footer";
import {Outlet, useLoaderData} from "react-router-dom";
import {baseUrl} from "../static/baseUrl";

export default function Master(props) {

    const isUserAuthed = useLoaderData()

    return (<div className={"font"}>
        <Header isUserAuthed={isUserAuthed}/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>);
}

export const isAuthLoader = async () => {

    let isUserAuth = false
    //this loader will set userMe into local storage
    try {
        let response
        await fetch(`${baseUrl}/getUserMe`, {
            credentials: "include",
            headers: {Cookies: document.cookie}
        }).then(res => res.json())
            .then(res => {
                response = res
            })

        if (response.status === 200) {
            isUserAuth = true
            //set current user in session storage
            localStorage.setItem("userMe", JSON.stringify(response.user))
        } else {
            isUserAuth = false
        }

    } catch (e) {
        console.log(e)
    }
    return isUserAuth
}