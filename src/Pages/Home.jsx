import React from 'react';
import UpperHomePage from "../Components/UpperHomePage";
import FlashSales from "../Components/FlashSales";
import {useOutletContext} from "react-router-dom";
import BrowseByCategory from "../Components/BrowseByCategory";
import BackToTop from "../Components/BackToTop";

export default function Home() {

    const isUserAuthed = useOutletContext()

    return (<div className={"flex flex-col pl-[135px]"}>
        <UpperHomePage/>
        <FlashSales isUserAuthed={isUserAuthed}/>
        <BrowseByCategory/>
        <BackToTop/>
    </div>);
}

