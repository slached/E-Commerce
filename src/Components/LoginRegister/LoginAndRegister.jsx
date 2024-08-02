import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {baseUrl} from "../../static/baseUrl";
import loginRegisterImage from "../../static/Images/login-register.png"
import {Link, useNavigate} from "react-router-dom";

export default function LoginAndRegister(props) {

    const inputStyles = "outline-none"
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
                        window.location.reload()
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

    return (
        <div className={"flex justify-center"}>
            <div className={"font flex mt-[60px] mb-[50px] w-[1300px]"}>
                <div className={"flex justify-start "}>
                    <img className={"h-[600px] min-w-[600px]"} alt={"login-register"}
                         src={loginRegisterImage}></img>
                </div>
                <div className={"grow"}></div>
                <div className={"flex"}>
                    <form className={"flex flex-col pl-[61px] pr-[60px] pt-[73px] pb-[92px] grow max-w-[605px]"}>

                        <div className={"flex flex-col gap-[24px] mb-[48px]"}>
                            {props.type === "login" ?
                                <h2 className={"font-semibold text-[36px] tracking-wide"}>Log in to Exclusive</h2> :
                                <h2 className={"font-semibold text-[36px] tracking-wide"}>Create an account</h2>}
                            <p className={"text-[16px]"}>Enter your details below</p>
                        </div>

                        <div className={"flex flex-col gap-y-[40px]"}>
                            {props.type === "register" && <label className={"flex flex-col gap-[8px]"}>
                                <input id={"name"} value={name} onChange={onChange} placeholder={"Name"}
                                       type={"text"}
                                       className={inputStyles}/>
                                <hr className={"border-none h-[1px] bg-gray-400"}/>
                            </label>}
                            <label className={"flex flex-col gap-[8px]"}>
                                <input id={"email"} value={email} onChange={onChange} placeholder={"Email address"}
                                       type={"email"}
                                       className={inputStyles}/>
                                <hr className={"border-none h-[1px] bg-gray-400"}/>
                            </label>
                            <label className={"flex flex-col gap-[8px] mb-[40px]"}>
                                <input id={"password"} value={password} onChange={onChange}
                                       placeholder={"Password"} type={"password"} className={inputStyles}/>
                                <hr className={"border-none h-[1px] bg-gray-400"}/>
                            </label>

                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-between mb-[30px] items-center"}>
                                <button
                                    onClick={() => {
                                        props.type === "login" ? login() : register()
                                    }}
                                    style={props.type === "register" ? {flexGrow: 1} : null}
                                    className={`bg-red-600 px-[38px] py-[16px] rounded-[4px] min-w-[170px]`}
                                    type={"button"}>
                                    {props.type === "login" ?
                                        <p className={"ml-[22px] mr-[18px] text-white"}>Log In</p> :
                                        <p className={"ml-[22px] mr-[18px] text-white"}>Create account</p>}
                                </button>
                                {props.type === "login" && <a href={""} className={"text-red-500"}>Forget Password?</a>}
                            </div>
                            <p className={"mb-[10px] text-red-500"}>{errMessage}</p>
                            {props.type === "login" ?
                                <p className={"text-start"}>I don’t have an account?
                                    <Link reloadDocument className={"underline underline-offset-8 ml-[16px]"}
                                          to={"/register"}>
                                        Create account
                                    </Link>
                                </p> :
                                <p className={"text-start"}>Already have account?
                                    <Link reloadDocument className={"underline underline-offset-8 ml-[16px]"}
                                          to={"/login"}>
                                        Log in
                                    </Link>
                                </p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
