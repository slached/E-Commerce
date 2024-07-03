import React from 'react';
import IconPhone from '../../static/Images/icons-phone.svg';
import IconMail from '../../static/Images/icons-mail.svg';

export default function ContactInformation(props) {
    return (
        <div className={"flex flex-col py-[48px] pl-[35px] pr-[43px] rounded-[4px] box-shadow-2"}>
            <div className={"flex items-center gap-[16px] mb-[24px]"}>
                <img alt={"img"} src={IconPhone}/>
                <p className={"font-semibold"}>Call To Us</p>
            </div>
            <div className={"flex flex-col gap-[16px] mb-[32px] text-[14px]"}>
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +8801611112222</p>
            </div>

            <div className={"p-0 m-0 border-none h-[2px] bg-gray-300 mb-[32px]"}></div>

            <div className={"flex items-center gap-[16px] mb-[24px]"}>
                <img alt={"img"} src={IconMail}/>
                <p className={"font-semibold"}>Write To US</p>
            </div>
            <div className={"flex flex-col gap-[16px] text-[14px]"}>
                <p>Fill out our form and we will contact you within 24 hours.</p>
                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
            </div>
        </div>
    );
}
