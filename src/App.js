import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Master, {isAuthLoader} from "./Layouts/Master";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Page404 from "./Pages/Page404";
import MyAccount from "./Pages/MyAccount";
import Profile from "./Components/Profile";

const router = createBrowserRouter(createRoutesFromElements(
    <Route loader={isAuthLoader} element={<Master/>}>
        <Route index element={<Home/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="account" element={<MyAccount/>}>
            <Route index element={<Profile/>}/>
            <Route path={"address"} element={<Profile/>}/>
            <Route path={"payment"} element={<Profile/>}/>
            <Route path={"returns"} element={<Profile/>}/>
            <Route path={"cancellations"} element={<Profile/>}/>
        </Route>
        <Route path="about" element={<About/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path='*' exact={true} element={<Page404/>}/>
    </Route>
))

export default function App() {
    return <RouterProvider router={router}/>;
}
