const express = require('express')
const router = express.Router()
const productController = require('../Controllers/Product.js')
//middlewares
const authMiddleware = require('../MiddleWares/Auth.js')

router.get('/getAll', productController.getAllProducts)
router.get('/getAllWithImage', productController.getAllProductsWithImage)
router.get('/getDiscountedProducts', productController.getDiscountedProductsWithImage)
router.get('/getOne/:id', productController.getOneProduct)

router.delete('/delete/:id', authMiddleware.isAdmin, productController.deleteProduct)

router.post('/create', authMiddleware.isAdmin, productController.createProduct)

router.patch('/update/:id', authMiddleware.isAdmin, productController.updateProduct)

module.exports = router