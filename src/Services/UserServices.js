import {baseUrl} from "../static/baseUrl";


export const getCart = async (fetchObject) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/cart/getCart`, fetchObject)
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) resolve(res.cart)
            })
            .catch(err => reject(err))
    })
}

export const getWishlist = async (fetchObject) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/wishlist/getAll`, fetchObject)
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) resolve(res.wishlist)
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
        body: JSON.stringify({...e.product, increaseQuantity: e?.increaseQuantity})

    }).then(res => res.json())
        .then(res => {
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const insertOrExtractFromWishlist = async (item) => {
    await fetch(`${baseUrl}/wishlist/insertAndExtract`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
        body: JSON.stringify({_id: item._id})
    }).then(res => res.json())
        .then(res => {
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateUser = async (item) => {
    return new Promise(async (resolve, reject) => {
        await fetch(`${baseUrl}/updatePassword/${item.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: item.username,
                email: item.email,
                address: item.address,
                currentPassword: item.currentPassword,
                newPassword: item.newPassword,
                confirmNewPassword: item.confirmNewPassword,
            })
        }).then(res => res.json())
            .then(res => {
                res.status === 200 ? resolve(res) : reject("Password is incorrect")
            })
            .catch(err => {
                reject(err)
            })
    })
}
