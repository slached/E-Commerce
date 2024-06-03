const Product = require('../Models/Product.js')

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.status(200).json({message: "Product saved", status: 400})
    } catch (err) {
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
module.exports = {createProduct, getAllProducts}