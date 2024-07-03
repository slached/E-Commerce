import React from 'react';
import SearchIcon from "../../static/Images/search.svg";

export default function SearchBar(props) {
    return (
        <div className={"flex bg-gray-100 rounded-[5px] px-[15px] py-[5px]"}>
            <input className={"mr-[34px] outline-none bg-gray-100 rounded-[5px]"}
                   placeholder={"What are you looking for?"}/>
            <img className={"bg-gray-100 rounded-[5px]"} alt={"search-icon"} src={SearchIcon}/>
        </div>
    );
}

