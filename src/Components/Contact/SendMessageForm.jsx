import React from 'react';
import Button from "../Global/Button";
import {Textarea} from "@nextui-org/react";

export default function SendMessageForm(props) {
    return (
        <div className={"flex flex-col gap-[45px] py-[40px] px-[32px] box-shadow-2"}>
            <div className={"flex gap-[16px]"}>
                <input
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                    placeholder={"Your Name"} type={"text"}/>
                <input
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                    placeholder={"Your Phone"} type={"text"}/>
                <input
                    className={"outline-none py-[16px] px-[13px] bg-[#F5F5F5] rounded-[4px]"}
                    placeholder={"Your Email"} type={"text"}/>
            </div>
            <Textarea
                variant="flat"
                placeholder="Your Message"
                disableAnimation
                disableAutosize
                classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[200px]",
                }}
            />
            <div className={"flex justify-end"}>
                <Button text={"Send Message"}/>
            </div>
        </div>
    );
}

