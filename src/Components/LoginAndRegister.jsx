import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {baseUrl} from "../static/baseUrl";
import shoppingCart from "../static/Images/shopping_cart.svg"
import rightArrow from "../static/Images/button_right_arrow.svg"
import {Link, useNavigate} from "react-router-dom";

export default function LoginAndRegister(props) {

    const inputStyles = "bg-[#FFF6F4] rounded-[4px] py-[13px] pl-[10px] max-w-[1000px] w-[478px] focus:outline-[#F47458]"
    const [cookies, setCookie, removeCookie] = useCookies();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [errMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const regExp = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")

    const onChange = (e) => {
        switch (e.target.id) {
            case "email":
                setEmail(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            case "name":
                setName(e.target.value)
                break
            default:
                break
        }
    }

    const login = () => {

        if (regExp.test(email)) {
            fetch(`${baseUrl}/login`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", Accept: "*/*",
                }, body: JSON.stringify({email, password})
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        //set auth token after login success
                        setCookie("auth", res.token)
                        setErrorMessage("")
                        //nav
                        navigate("/")
                    } else {
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

    const register = () => {

        if (regExp.test(email)) {
            fetch(`${baseUrl}/register`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", Accept: "*/*",
                }, body: JSON.stringify({name, email, password})
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        //if register success than trigger log in function
                        login()
                    } else {
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

    return (<div className={"font flex h-screen"}>

        {props.type === "register" &&
            <div className={"flex-grow-[4] bg-[#FFEDE1] flex justify-end items-center max-w-[600px]"}>
                <img alt={"shop_cart"} className={"max-w-[500px] "} src={shoppingCart}></img>
            </div>}

        <div className={"flex justify-center items-center flex-grow-[6]"}>
            <form className={"flex flex-col pl-[61px] pr-[60px] pt-[73px] pb-[92px] rounded-[20px] box-shadow "}>
                <h2 className={"font-semibold text-[#F47458] text-[36px] mb-[60px]"}>Orange Bag</h2>

                {props.type === "login" ? <h1 className={"font-semibold text-[56px] mb-[30px]"}>Sign in</h1> :
                    <h1 className={"font-semibold text-[56px] mb-[30px]"}>Sing up</h1>}

                <div className={"flex flex-col gap-y-[20px] mb-[40px]"}>
                    {props.type === "register" && <label>
                        <p className={"mb-[7px]"}>Name</p>
                        <input id={"name"} value={name} onChange={onChange} placeholder={"J.R.R Tolkien"}
                               type={"text"}
                               className={inputStyles}/>
                    </label>}
                    <label>
                        <p className={"mb-[7px]"}>Email</p>
                        <input id={"email"} value={email} onChange={onChange} placeholder={"example@gmail.com"}
                               type={"email"}
                               className={inputStyles}/>
                    </label>
                    <label>
                        <div className={"flex justify-between"}>
                            <p className={"mb-[7px]"}>Password</p>
                            <a href={""} className={"font-light text-[14px]"}>Forgot Password?</a>
                        </div>
                        <input id={"password"} value={password} onChange={onChange}
                               placeholder={"*****************"} type={"password"} className={inputStyles}/>
                    </label>
                    <p className={"text-red-500 text-sm"}>{errMessage}</p>
                </div>
                <div className={"flex flex-col items-center"}>
                    <button
                        onClick={() => {
                            props.type === "login" ? login() : register()
                        }}
                        className={"bg-[#F47458] rounded-3xl text-white flex justify-center items-center py-[11px] w-[150px] mb-[40px]"}
                        type={"button"}>
                        {props.type === "login" ? <p className={"ml-[22px] mr-[18px]"}>Sign In</p> :
                            <p className={"ml-[22px] mr-[18px]"}>Sign up</p>}
                        <img alt={"button_right_arrow"} src={rightArrow}/>
                    </button>
                    {props.type === "login" && <p style={{
                        color: "rgba(0, 0, 0, 0.2)"
                    }}>I don’t have an account ? <Link className={"text-[#F47458]"} to={"/register"}>Sign up</Link></p>}
                </div>
            </form>
        </div>
        {props.type === "login" &&
            <div className={"flex-grow-[4] bg-[#FFEDE1] flex justify-end items-center max-w-[600px]"}>
                <img alt={"shop_cart"} className={"max-w-[500px] "} src={shoppingCart}></img>
            </div>}
    </div>);
}
