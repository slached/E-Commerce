import React from 'react';
import {baseUrl} from "../static/baseUrl";
import HeaderBlackBar from "../Components/PageComponents/HeaderBlackBar";
import HeaderNavigator from "../Components/PageComponents/HeaderNavigator";

export default function Header(props) {

    const logout = () => {
        fetch(`${baseUrl}/logout`, {
            method: "POST", credentials: "include", headers: {Cookies: document.cookie}
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

    return (<header className="flex flex-col">
        <HeaderBlackBar/>
        <HeaderNavigator logout={logout} isUserAuthed={props.isUserAuthed}/>
        <hr className="border-none bg-gray-200 h-[1px]"/>
    </header>);
}
