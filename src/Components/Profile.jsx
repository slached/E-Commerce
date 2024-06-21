import React, {useState} from 'react';
import {useOutletContext} from "react-router-dom";
import Button from "./Button";
import {updateUser} from "../Services/UserServices";
import {baseUrl} from "../static/baseUrl";

export default function Profile(props) {

    const user = useOutletContext()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [errMessage, setErrorMessage] = useState("")

    const submit = () => {

        if (newPassword === confirmNewPassword) {

            const regExp = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
            if (email.length === 0) {
                //email field not changed
                updateUser({
                    username: username,
                    email: email,
                    address: address,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                    id: user._id
                })
                    .then(res => {
                        window.location.reload();
                    })
                    .catch(err => {
                        setErrorMessage(err)
                    });
            } else {
                if (regExp.test(email)) {
                    updateUser({
                        username: username,
                        email: email,
                        address: address,
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        confirmNewPassword: confirmNewPassword,
                        id: user._id
                    })
                        .then(res => {
                            window.location.reload();
                        })
                        .catch(err => {
                            setErrorMessage(err)
                        });
                } else {
                    setErrorMessage("Invalid email type")
                }
            }
        } else {
            setErrorMessage("Your new password and confirm password is not match ")

        }
    }

    return (<div className={"flex flex-col box-shadow-2 py-[40px] px-[80px] gap-[16px] ml-[100px] mb-[140px]"}>
        <h2 className={"text-[#DB4444] text-[20px] font-semibold "}>Edit Your Profile</h2>
        <label className={"flex flex-col gap-[8px] mb-[8px]"}>
            <p className={"font-semibold"}>Full Name</p>
            <input
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                placeholder={user.name} type={"text"}/>
        </label>
        <div className={"flex gap-[50px] mb-[8px]"}>
            <label className={"flex flex-col gap-[8px] mb-[8px] grow"}>
                <p className={"font-semibold"}>Email</p>
                <input
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                    placeholder={user.email} type={"text"}/>
            </label>
            <label className={"flex flex-col gap-[8px] mb-[8px] grow"}>
                <p className={"font-semibold"}>Address</p>
                <input
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                    placeholder={user.address} type={"text"}/>
            </label>
        </div>
        <div className={"flex flex-col gap-[16px]"}>
            <label className={"flex flex-col gap-[8px]"}>
                <p className={"font-semibold"}>Password Changes</p>
                <input
                    onChange={(e) => {
                        setCurrentPassword(e.target.value)
                    }}
                    placeholder={"Current Password"}
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"} type={"password"}/>
            </label>
            <input
                onChange={(e) => {
                    setNewPassword(e.target.value)
                }}
                placeholder={"New Password"}
                className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"} type={"password"}/>
            <input
                onChange={(e) => {
                    setConfirmNewPassword(e.target.value)
                }}
                placeholder={"Confirm New Password"}
                className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"} type={"password"}/>
        </div>

        <div className={"flex justify-between items-center "}>
            <p className={"text-[#DB4444]"}>{errMessage}</p>
            <div className={"flex gap-[32px] items-center"}>
                <p>Cancel</p>
                <Button onclick={submit} text={"Save Changes"}/>
            </div>
        </div>
    </div>);
}
