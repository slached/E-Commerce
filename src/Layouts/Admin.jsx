import React from 'react';
import {Outlet} from "react-router-dom";

export default function Admin(props) {
    return (
        <div className={"bg-gray-900 h-screen text-white"}>
            <Outlet/>
        </div>
    );
}

