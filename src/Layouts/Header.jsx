import React from 'react';
import {baseUrl} from "../static/baseUrl";

export default function Header(props) {

    const logout = () => {
        fetch(`${baseUrl}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {Cookies: document.cookie}
        })
            .then(res => res.json())
            .then(res => {
                //remove userMe from localstorage
                localStorage.removeItem("userMe")
                //reload page
                window.location.reload()
            })
            .catch(err => err)
    }

    return (
        <header>
            <button onClick={() => logout()}>Logout</button>
        </header>
    );
}
