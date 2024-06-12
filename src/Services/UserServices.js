import {baseUrl} from "../static/baseUrl";


export const getCart = async (fetchObject) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/cart/getCart`, fetchObject)
            .then(res => res.json())
            .then(res => {
                resolve(res.cart)
            })
            .catch(err => reject(err))
    })
}

export const addToCart = async (e) => {
    await fetch(`${baseUrl}/cart/addCart`, {
        method: "POST",
        credentials: "include",
        headers: {
            Cookie: document.cookie,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(e.product)

    }).then(res => res.json())
        .then(res => {
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
