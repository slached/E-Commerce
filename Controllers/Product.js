const Product = require('../Models/Product.js')
const Image = require('../Models/Image.js')
const Category = require('../Models/Category.js')

const _ = require('lodash')

const createProduct = async (req, res) => {
    try {
        if (req.body.isDiscounted === true && req.body.discountPercentage === undefined) {
            res.status(200).json({
                message: "You select discount as true but you did not select discount percentage", status: 400
            })
        } else {
            const newProduct = new Product(req.body)

            if (req.body.isDiscounted === false) newProduct.discountPercentage = null

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

    const {query, sort} = req.query

    try {
        let products = await Product.find()

        if (query) {
            const category = await Category.findOne({name: _.capitalize(query)})
            products = await Product.find({categoryId: {$in: category._id.toString()}})
        }

        const resultArray = []

        for (const product of products) {
            const images = []
            for (const imageId of product.imageId) {
                const image = await Image.findById(imageId, {url: 1, _id: 0})
                images.push(image.url)
            }
            resultArray.push({product: product, images: images})
        }

        res.status(200).json({products: resultArray, status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const getDiscountedProductsWithImage = async (req, res) => {

    try {
        let products = await Product.find({isDiscounted: true})

        const resultArray = []

        for (const product of products) {
            const images = []
            for (const imageId of product.imageId) {
                const image = await Image.findById(imageId, {url: 1, _id: 0})
                images.push(image.url)
            }
            resultArray.push({product: product, images: images})
        }

        res.status(200).json({products: resultArray, status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }

}

const deleteProduct = async (req, res) => {

    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete(id)
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