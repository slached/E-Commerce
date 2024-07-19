import {baseUrl} from "../static/baseUrl";

export const getAllImages = () => {
    return new Promise(async (resolve, reject) => {
        const images = await fetch(`${baseUrl}/image/getAll`)
        const response = await images.json()
        if (response.status === 200) {
            resolve(response.data)
        } else reject(response.err)
    })
}