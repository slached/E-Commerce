import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Master from "./Layouts/Master";
import Home, {homeLoader} from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Master/>}>
        <Route index element={<Home/>} loader={homeLoader}>

        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
    </Route>
))

export default function App(props) {
    return <RouterProvider router={router}/>;
}
