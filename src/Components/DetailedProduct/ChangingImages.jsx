import React, {useEffect, useState} from 'react';
import {image} from "@nextui-org/react";

export default function ChangingImages(props) {

    const [images, setImages] = useState([]);

    useEffect(() => {
        for (const [index, image] of props.images.entries()) {
            if (index === 0) setImages(prevState => [...prevState, {image: image, isActive: true}])
            else setImages(prevState => [...prevState, {image: image, isActive: false}])
        }

    }, []);

    const setActiveImage = (index) => {
        const newImages = images.map((value, index1) => index === index1 ? {image: value.image, isActive: true} : {
            image: value.image,
            isActive: false
        })
        setImages(newImages)
    }

    return (
        <div className={"flex gap-[30px]"}>

            {/* inactive items*/}
            <div className={"flex flex-col gap-[16px]"}>
                {images.map((data, index) => !data.isActive &&
                    <img key={index} className={"cursor-pointer min-w-[170px]  min-h-[138px] max-w-[170px] max-h-[138px]"} onClick={() => setActiveImage(index)} loading={"lazy"}
                         alt={index.toString()}
                         src={data.image.url}/>)}
            </div>

            {/* active items*/}
            <div className={"flex flex-col gap-[16px]"}>
                {images.map((data, index) => data.isActive &&
                    <img key={index} className={"cursor-pointer min-w-[500px] min-h-[600px] max-w-[500px] max-h-[600px]"} onClick={() => setActiveImage(index)} loading={"lazy"}
                         alt={index.toString()}
                         src={data.image.url}/>)}
            </div>

        </div>
    );
}

