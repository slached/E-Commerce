import React, {useEffect, useState} from 'react';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import {baseUrl} from "../static/baseUrl";
import {useLoaderData, useNavigate} from "react-router-dom";

export default function Home(props) {

    const navigate = useNavigate()
    const isUserAuthed = useLoaderData()
    const [productAndImage, setProductAndImage] = useState([])

    const fetchObject = {
        credentials: "include",
        headers: {Cookie: document.cookie}
    }

//this useEffect is for get all productAndImage
    useEffect(() => {
        //first fetch goes and get all productAndImage
        fetch(`${baseUrl}/product/getAll`, fetchObject)
            .then(res => res.json())
            .then(res => {
                //this foreach goes for all productAndImage and get image object of each product
                res.products.forEach(product => {
                    fetch(`${baseUrl}/image/getImageURI/${product.imageId}`, fetchObject)
                        .then(res => res.json())
                        .then(imageOfProduct => {
                            const productObjectWithImage = {
                                image: imageOfProduct,
                                product: product
                            }
                            setProductAndImage(oldProductsArr => [...oldProductsArr, productObjectWithImage])
                        })
                        .catch(err => err)
                })

            })
    }, []);

    return (
        <div>
            <Header isUserAuthed={isUserAuthed}/>
            <main>
                {productAndImage.map(item => {
                    return (<div>
                        <img height={"100px"} width={"100px"} alt={"product_img"} src={item.image.dataUrl}/>
                        <p>{item.product.name}</p>
                    </div>)
                })}
            </main>
            <Footer/>
        </div>
    );
}

export const homeLoader = async () => {
    let isUserAuth = false
    //this loader will set userMe into local storage
    try {
        let response
        await fetch(`${baseUrl}/getUserMe`, {
            credentials: "include",
            headers: {Cookies: document.cookie}
        }).then(res => res.json())
            .then(res => {
                response = res
            })

        if (response.status === 200) {
            isUserAuth = true
            //set current user in session storage
            localStorage.setItem("userMe", JSON.stringify(response.user))
        } else {
            isUserAuth = false
        }

    } catch (e) {
        console.log(e)
    }
    return isUserAuth
}