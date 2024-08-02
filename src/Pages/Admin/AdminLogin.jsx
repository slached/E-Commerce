import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {baseUrl} from "../../static/baseUrl";
import {useNavigate} from "react-router-dom";

export default function AdminLogin(props) {

    const [cookies, setCookie, removeCookie] = useCookies()
    const inputClass = "bg-none border-2 focus:border-red-200 rounded-md p-2 outline-none text-black"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    //delete previous user
    useEffect(() => {
        removeCookie("auth")
        localStorage.removeItem("userMe")
    }, []);

    const regExp = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")

    const submitHandler = () => {

        if (regExp.test(email)) {
            fetch(`${baseUrl}/login`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", Accept: "*/*",
                }, body: JSON.stringify({email, password})
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setCookie("auth", res.token)
                        setErrorMessage("")
                        fetch(`${baseUrl}/getUserMe`, {
                            method: "GET", credentials: "include", headers: {Cookies: document.cookie}
                        }).then(r => r.json())
                            .then(r => {
                                if (r.status === 200) {
                                    if (r.user.role === "admin") {
                                        navigate("panel")
                                        localStorage.setItem("userMe", JSON.stringify(r.user))
                                        window.location.reload()
                                    } else {
                                        setErrorMessage("User does not have permission to enter admin panel.")
                                        removeCookie("auth")
                                    }
                                }
                            })
                            .catch(err => err)
                    } else {
                        setPassword("")
                        setErrorMessage(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            if (email !== "") setErrorMessage("Invalid email type!")
            else setErrorMessage("Please fill the fields.")
        }

    }

    return (
        <div className={"h-screen flex justify-center items-center"}>
            <div
                className={"flex flex-col rounded-md border border-white px-5 py-7 gap-5"}>
                <div className={"flex justify-center"}>
                    <label>
                        <p className={"text-[14px]max-w-fit text-white"}>E-mail</p>
                        <input name={"email"} onChange={e => setEmail(e.target.value)} value={email}
                               className={inputClass}
                               type="email"/>
                    </label>
                </div>
                <div className={"flex justify-center"}>
                    <label>
                        <p className={"text-[14px]max-w-fit text-white"}>Password</p>
                        <input name={"password"} value={password} onChange={e => setPassword(e.target.value)}
                               className={inputClass}
                               type="password"/>
                    </label>
                </div>
                <p className={"text-red-600 text-[12px] font-semibold"}>{errorMessage}</p>
                <div className={"flex justify-center"}>
                    <button onClick={() => submitHandler()}
                            className={"border border-white rounded-md max-w-fit px-4 py-1"}>Login
                    </button>
                </div>
            </div>
        </div>
    );
}
