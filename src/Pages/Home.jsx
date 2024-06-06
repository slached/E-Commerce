import React, {useEffect, useState} from 'react';
import {baseUrl} from "../static/baseUrl";
import {useNavigate} from "react-router-dom";

export default function Home(props) {

    const navigate = useNavigate()
    const [productAndImage, setProductAndImage] = useState([])

    const fetchObject = {
        credentials: "include",
        headers: {Cookie: document.cookie}
    }

    //this useEffect is getting all productAndImages
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

        </div>
    );
}

