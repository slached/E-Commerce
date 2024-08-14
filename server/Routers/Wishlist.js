const express = require('express')
const router = express.Router()

const wishlistController = require("../Controllers/Wishlist.js");
const authMiddleware = require("../MiddleWares/Auth");

router.get("/getAll", authMiddleware.isUser, wishlistController.getWishlist)
router.get("/getDetailed", authMiddleware.isUser, wishlistController.getDetailedWishlist)

router.post("/toCart", authMiddleware.isUser, wishlistController.transferIntoCart)

router.delete("/delete/:id", authMiddleware.isUser, wishlistController.deleteFromWishlist)

router.patch("/insertAndExtract", authMiddleware.isUser, wishlistController.insertAndExtract)

module.exports = router