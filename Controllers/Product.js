const Product = require('../Models/Product.js')
const Image = require('../Models/Image.js')
const Category = require('../Models/Category.js')
const User = require('../Models/User.js')

const _ = require('lodash')

const responseMergedWithImageURI = async (products) => {

    const resultArray = []

    //this find images
    for (const product of products) {
        const images = []
        for (const imageId of product.imageId) {
            const image = await Image.findById(imageId, {name: 1, url: 1, _id: 1})
            images.push(image)
        }

        resultArray.push({product: product, images: images})
    }

    return resultArray
}

const createProduct = async (req, res) => {
    try {
        if (req.body.isDiscounted === true && req.body.discountPercentage === undefined) {
            res.status(200).json({
                message: "You select discount as true but you did not select discount percentage", status: 400
            })
        } else {
            const newProduct = new Product(req.body)
            if (req.body.isDiscounted === false) newProduct.discountPercentage = null

            if (!req.body.isDiscounted && (req.body.discountPercentage !== undefined || req.body.discountPercentage)) newProduct.isDiscounted = true

            await newProduct.save();
            res.status(200).json({message: "Product saved", status: 200})
        }
    } catch (err) {
        console.log(err)
        res.status(200).json({message: err.message, status: 400})
    }
}

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find()
        res.status(200).json({products: products, status: 200})
    } catch (err) {
        res.status(400).json({message: err.message, status: 400})
    }
}

const getAllProductsWithImage = async (req, res) => {

    let {query, sort, search} = req.query

    try {
        let products = await Product.find({})

        if (search !== undefined) {
            const quantityOfShownProduct = 6
            if (search === "") search = 0
            const count = await Product.countDocuments({})
            let next
            //this checks if there is next paging
            if ((parseInt(search) + 1) * quantityOfShownProduct >= count) next = null
            else next = `http://localhost:${process.env.PORT}/api/v1/product/getAllWithImage?search=${parseInt(search) + 1}`
            //this checks if there is prev paging
            let prev
            if (search <= 0) prev = null
            else prev = `http://localhost:${process.env.PORT}/api/v1/product/getAllWithImage?search=${parseInt(search) - 1}`

            products = await Product.find({}).limit(quantityOfShownProduct).skip(search * quantityOfShownProduct)

            const resultObject = {
                count: count,
                next: next,
                previous: prev,
                results: await responseMergedWithImageURI(products)
            }

            return res.status(200).json({...resultObject, status: 200})
        }

        if (query) {
            const category = await Category.findOne({name: new RegExp(`^${query}$`, 'i')})
            products = await Product.find({categoryId: {$in: category._id.toString()}})
        }

        res.status(200).json({products: await responseMergedWithImageURI(products), status: 200})

    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const getDiscountedProductsWithImage = async (req, res) => {

    try {
        let products = await Product.find({isDiscounted: true})
        res.status(200).json({products: await responseMergedWithImageURI(products), status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }

}

const deleteProduct = async (req, res) => {

    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(200).json({message: `${id} product is not in the db`, status: 404})

        //here we check if the product in wishlist any of the users
        //if in any wishlist or cart delete item from their cart or wishlist either
        const users = await User.find()
        for (const [index1, eachUser] of users.entries()) {
            for (const [index2, eachProductInsideOfCart] of eachUser.cart.entries()) {
                eachProductInsideOfCart.productId === id && users[index1].cart.splice(index2, 1)
            }
            for (const [index2, eachProductInsideOfWishlist] of eachUser.wishList.entries()) {
                eachProductInsideOfWishlist.productId === id && users[index1].wishList.splice(index2, 1)
            }
            await eachUser.save()
        }

        res.status(200).json({message: `${product.name} deleted successfully`, status: 200})

    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const {imageId, categoryId} = req.body

        if (imageId) {
            const image = await Image.findById(imageId)
            if (!image) return res.status(200).json({message: `Image with id ${imageId} not found`, status: 404})
        }

        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (!category) return res.status(200).json({
                message: `Category with id ${categoryId} not found`,
                status: 404
            })
        }

        //this prevents update isDiscounted without percentage
        if (req.body.isDiscounted === true && req.body.discountPercentage === undefined) {
            res.status(200).json({
                message: "You select discount as true but you did not select discount percentage", status: 400
            })
        } else {
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body)

            //if isDiscounted false and trying to insert percentage
            if (!updatedProduct.isDiscounted && req.body.discountPercentage !== undefined) updatedProduct.isDiscounted = true

            //if body isDiscounted is false make percentage null
            if (req.body.isDiscounted === false) updatedProduct.discountPercentage = null

            //if body discountPercentage is blank or null than set discount percentage null and set isDiscounted to false
            if (req.body.discountPercentage === "" || req.body.discountPercentage === null) {
                updatedProduct.discountPercentage = null
                updatedProduct.isDiscounted = false
            }

            //save
            await updatedProduct.save()
            res.status(200).json({message: `${updatedProduct.name} updated successfully`, status: 200})
        }

    } catch (err) {
        res.status(200).json({message: err.message, status: 400})

    }
}

const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)

        res.status(200).json({message: product, status: 200})
    } catch (err) {
        res.status(200).json({err: err.message, status: 400})

    }
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getAllProductsWithImage,
    getDiscountedProductsWithImage
}