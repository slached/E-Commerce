import React from 'react';
import {Outlet} from "react-router-dom";
import '../static/Style/Global.css'

export default function Master(props) {
    return (<Outlet/>);
}
