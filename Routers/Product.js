const express = require('express')
const router = express.Router()
const productController = require('../Controllers/Product.js')
//middlewares
const authMiddleware = require('../MiddleWares/Auth.js')

router.get('/getAll', productController.getAllProducts)

router.post('/create', authMiddleware, productController.createProduct)

module.exports = router