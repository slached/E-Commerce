import React from 'react';
import BreadCrumb from "../../Components/Global/BreadCrumb";
import ContactInformation from "../../Components/Contact/ContactInformation";
import SendMessageForm from "../../Components/Contact/SendMessageForm";

export default function Contact(props) {
    return (
        <div className="flex justify-center">
            <div className={"flex flex-col max-w-[1300px] mb-[60px] py-[80px]"}>
                <div className={"mb-[80px]"}><BreadCrumb/></div>
                <div className={"flex gap-[30px]"}>
                    <ContactInformation/>
                    <SendMessageForm/>
                </div>
            </div>
        </div>
    );
}

