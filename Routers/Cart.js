const express = require('express')
const router = express.Router()

const cartController = require("../Controllers/Cart.js");
const authMiddleware = require("../MiddleWares/Auth");

router.get("/getCart", cartController.getCart)

router.post('/addCart', authMiddleware, cartController.addCart)

router.patch('/update/:id', authMiddleware, cartController.updateCart)

module.exports = router