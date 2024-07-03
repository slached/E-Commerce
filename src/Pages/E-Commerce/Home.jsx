import React from 'react';
import UpperHomePage from "../../Components/HomePage/UpperHomePage";
import FlashSales from "../../Components/HomePage/FlashSales/FlashSales";
import {useOutletContext} from "react-router-dom";
import BrowseByCategory from "../../Components/HomePage/Category/BrowseByCategory";
import BackToTop from "../../Components/Global/BackToTop";

export default function Home() {

    const isUserAuthed = useOutletContext()

    return (<div className={"flex flex-col pl-[135px]"}>
        <UpperHomePage/>
        <FlashSales isUserAuthed={isUserAuthed}/>
        <BrowseByCategory/>
        <BackToTop/>
    </div>);
}

