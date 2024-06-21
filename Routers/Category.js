const express = require('express')
const router = express.Router()

const authMiddleware = require('../MiddleWares/auth.js')

const categoryController = require('../Controllers/Category.js')

router.get('/getAll', authMiddleware, categoryController.getAllCategories)

router.delete('/delete/:id', authMiddleware, categoryController.deleteCategory)

router.post('/create', categoryController.createCategory)

module.exports = router