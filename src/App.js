import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import Master, {isAuthLoader} from "./Layouts/Master";
import Home from "./Pages/E-Commerce/Home";
import Register from "./Pages/E-Commerce/Register";
import Login from "./Pages/E-Commerce/Login";
import Contact from "./Pages/E-Commerce/Contact";
import About from "./Pages/E-Commerce/About";
import Cart from "./Pages/E-Commerce/Cart";
import Wishlist from "./Pages/E-Commerce/Wishlist";
import Page404 from "./Pages/E-Commerce/Page404";
import MyAccount from "./Pages/E-Commerce/MyAccount";
import Product, {productLoader} from "./Pages/E-Commerce/Product";

import Profile from "./Components/Profile/Profile";
import Admin from "./Layouts/Admin";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPanel from "./Pages/Admin/AdminPanel";
import UploadImageForm from "./Components/Admin/UploadImageForm";
import CreateProduct from "./Pages/Admin/Product";
import Spreader from "./Layouts/Spreader";
import Category from "./Pages/Admin/Category";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Spreader/>}>
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
            <Route path="product" loader={productLoader} element={<Product/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path='*' exact={true} element={<Page404/>}/>
        </Route>

        <Route path={"admin"} element={<Admin/>}>
            <Route index element={<AdminLogin/>}/>
            <Route element={<AdminPanel/>} path={"panel"}>
                <Route path={"uploadImage"} element={<UploadImageForm/>}/>
                <Route path={"product"} element={<CreateProduct/>}/>
                <Route path={"category"} element={<Category/>}/>

            </Route>
        </Route>
    </Route>
))

export default function App() {
    return <RouterProvider router={router}/>;
}
