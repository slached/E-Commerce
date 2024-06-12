import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Master, {isAuthLoader} from "./Layouts/Master";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Cart from "./Pages/Cart";

const router = createBrowserRouter(createRoutesFromElements(
    <Route loader={isAuthLoader} element={<Master/>}>
        <Route index element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
    </Route>
))

export default function App(props) {
    return <RouterProvider router={router}/>;
}
