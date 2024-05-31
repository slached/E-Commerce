import React from 'react';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import {baseUrl} from "../static/baseUrl";
import {json} from "react-router-dom";


export default function Home(props) {

    return (
        <div>
            <Header/>
            <main>
                <div>1</div>
            </main>
            <Footer/>
        </div>
    );
}

export const homeLoader = async () => {
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

        if (response.status === 403) {
            window.location.href = "http://localhost:3000/login"
        } else {
            //set current user in local storage
            localStorage.setItem("userMe", JSON.stringify(response.user))
        }

    } catch (e) {
        console.log(e)
    }
    return null
}