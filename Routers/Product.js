const express = require('express')
const router = express.Router()
const productController = require('../Controllers/Product.js')
//middlewares
const authMiddleware = require('../MiddleWares/Auth.js')

router.get('/getAll', productController.getAllProducts)

router.delete('/delete/:id', productController.deleteProduct)

router.post('/create', authMiddleware, productController.createProduct)

router.patch('/update/:id', authMiddleware, productController.updateProduct)
module.exports = router