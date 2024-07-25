import {baseUrl} from "../static/baseUrl";
import CategorySelect from "../Components/Admin/Selects/CategorySelect";
import React from "react";

export const getAllImages = () => {
    return new Promise(async (resolve, reject) => {
        const images = await fetch(`${baseUrl}/image/getAll`)
        const response = await images.json()
        if (response.status === 200) {

            const images = new Set()
            for (const eachObject of response.data) images.add({
                key: eachObject._id, label: eachObject.name
            })

            resolve(images)
        } else reject(response.err)
    })

}

export const getAllCategories = () => {
    return new Promise(async (resolve, reject) => {
        const images = await fetch(`${baseUrl}/category/getAll`)
        const response = await images.json()
        if (response.status === 200) {

            const categories = new Set()
            for (const eachObject of response.data) categories.add({
                key: eachObject.category._id, label: eachObject.category.name
            })

            resolve(categories)
        } else reject(response.err)
    })

}