import React from 'react';
import UpperHomePage from "../Components/PageComponents/UpperHomePage";
import FlashSales from "../Components/PageComponents/FlashSales";
import {useOutletContext} from "react-router-dom";

export default function Home() {

    const isUserAuthed = useOutletContext()

    return (<div className={"flex flex-col pl-[135px]"}>
        <UpperHomePage/>
        <FlashSales isUserAuthed={isUserAuthed}/>
    </div>);
}

