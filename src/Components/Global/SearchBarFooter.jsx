import React from 'react';
import SearchIcon from "../../static/Images/search.svg";
import IconSend from '../../static/Images/icon-send.svg'

export default function searchBarFooter(props) {
    return (
        <div className={"flex rounded-[5px] px-[15px] py-[12px] border-2 border-white min-w-[245px]"}>
            <input className={"bg-black outline-none rounded-[5px]"}
                   placeholder={"Enter your email"}/>
            <img alt={"search-icon"} src={IconSend}/>
        </div>
    );
}

