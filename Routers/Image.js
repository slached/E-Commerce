const express = require('express')
const router = express.Router()
const imageController = require('../Controllers/Image.js')
//middlewares
const multerMiddleware = require('../MiddleWares/Multer.js')
const authMiddleware = require('../MiddleWares/Auth.js')

router.delete('/delete/:id', authMiddleware, imageController.deleteImage)

router.get('/getAll', imageController.getAllImages)
router.get('/getImageURI/:id', imageController.getImageURI)

router.post('/upload', authMiddleware, multerMiddleware.single('image'), imageController.createImage)

module.exports = router