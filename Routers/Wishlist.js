const express = require('express')
const router = express.Router()

const wishlistController = require("../Controllers/Wishlist.js");
const authMiddleware = require("../MiddleWares/Auth");

router.get("/getAll", authMiddleware, wishlistController.getWishlist)
router.get("/getDetailed", authMiddleware, wishlistController.getDetailedWishlist)

router.post("/toCart", authMiddleware, wishlistController.transferIntoCart)

router.delete("/delete/:id", authMiddleware, wishlistController.deleteFromWishlist)

router.patch("/insertAndExtract", authMiddleware, wishlistController.insertAndExtract)

module.exports = router