const express = require('express')
const router = express.Router()

const authMiddleware = require('../MiddleWares/auth.js')

const categoryController = require('../Controllers/Category.js')

router.get('/getAll', categoryController.getAllCategories)

router.patch('/update/:id', authMiddleware.isAdmin, categoryController.updateCategory)

router.delete('/delete/:id', authMiddleware.isAdmin, categoryController.deleteCategory)

router.post('/create', authMiddleware.isAdmin, categoryController.createCategory)

module.exports = router