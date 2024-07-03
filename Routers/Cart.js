const express = require('express')
const router = express.Router()

const cartController = require("../Controllers/Cart.js");
const authMiddleware = require("../MiddleWares/Auth");

router.get("/getCart", authMiddleware.isUser, cartController.getCart)

router.delete('/delete/:id', authMiddleware.isUser, cartController.deleteFromCart)

router.post('/addCart', authMiddleware.isUser, cartController.addCart)

router.patch('/update/:id', authMiddleware.isUser, cartController.updateCart)

module.exports = router