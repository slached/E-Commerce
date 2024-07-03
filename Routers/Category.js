const express = require('express')
const router = express.Router()

const authMiddleware = require('../MiddleWares/auth.js')

const categoryController = require('../Controllers/Category.js')

router.get('/getAll', categoryController.getAllCategories)

router.delete('/delete/:id', authMiddleware.isAdmin, categoryController.deleteCategory)

router.post('/create', categoryController.createCategory)

module.exports = router