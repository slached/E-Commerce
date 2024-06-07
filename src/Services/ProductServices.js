import {baseUrl} from "../static/baseUrl";

export const findAllProductAndImage = (fetchObject) => {

    return new Promise(async (resolve, reject) => {

        let products = []
        //first fetch goes and get all productAndImage
        await fetch(`${baseUrl}/product/getAll`, fetchObject)
            .then(res => res.json())
            .then(res => {
                products = res.products
            })

        const imageAndProductArray = []
        //and thirdly it's return image of the product
        const process = (product) => {
            return new Promise((resolve, reject) => {
                fetch(`${baseUrl}/image/getImageURI/${product.imageId}`, fetchObject)
                    .then(res => res.json())
                    .then(imageOfProduct => {
                        resolve({image: imageOfProduct, product: product})
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        //secondly it goes run process method for each product
        // after promise resolved image of that product bind's into product
        for (const product of products) {
            const imageAndProduct = await process(product);
            imageAndProductArray.push(imageAndProduct)
        }
        //this response return to the slice
        resolve(imageAndProductArray)
    })

}


