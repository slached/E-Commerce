const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Product = require("../Models/Product");
const Image = require("../Models/Image");

const insertAndExtract = async (req, res) => {

    try {
        const {_id} = req.body

        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)
        const product = await Product.findById(_id)

        //check is it valid product
        if (!product) return res.status(200).json({err: `${_id} is not founded in products`, status: 404})

        //check for is product inside wishlist
        for (const [index, wishlistItem] of user.wishList.entries()) {
            if (wishlistItem.productId === _id) {
                user.wishList.splice(index, 1)
                await user.save()
                return res.status(200).json({message: `${product.name} removed from the wishlist`, status: 200})
            }
        }

        //if here runs that means product is not in the wishlist now we can make the insertion
        user.wishList.push({productId: _id})
        await user.save()
        res.status(200).json({message: `${product.name} added to the wishlist`, status: 200})


    } catch (err) {
        res.status(200).json({err: err, status: 400})
    }

}

const getWishlist = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)
        res.status(200).json({wishlist: user.wishList, status: 200})

    } catch (err) {
        res.status(200).json({err: err, status: 400})
    }
}

const getDetailedWishlist = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)

        const returnArray = []

        for (const [index, wishlistItem] of user.wishList.entries()) {
            const product = await Product.findById(wishlistItem.productId)
            const image = await Image.findById(product.imageId)
            returnArray.push({product: product, image: image.url})
        }

        res.status(200).json({wishlist: returnArray, status: 200})
    } catch (err) {
        res.status(200).json({err: err.message, status: 400})
    }
}

const deleteFromWishlist = async (req, res) => {
    try {

        const productId = req.params.id

        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)


        const product = await Product.findById(productId)

        if (!product) return res.status(200).json({message: `${productId} could not founded!`, status: 400})

        for (const [index, wishlistItem] of user.wishList.entries()) {
            if (wishlistItem.productId === productId) {
                user.wishList.splice(index, 1)
                await user.save()
                return res.status(200).json({message: `${product.name} deleted from wishlist.`, status: 200})
            }
        }

        res.status(200).json({message: `${product.name} could not founded in wishlist.`, status: 400})

    } catch (err) {
        res.status(200).json({err: err.message, status: 400})
    }
}

const transferIntoCart = async (req, res) => {
    try {

        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)

        for (let indexW = user.wishList.length - 1; indexW >= 0; indexW--) {
            const wishlistItem = user.wishList[indexW];
            let isUpdated = false;

            for (const [indexC, cartItem] of user.cart.entries()) {
                // if wishlist item already in cart
                if (wishlistItem.productId === cartItem.productId) {
                    user.cart[indexC] = {
                        productId: cartItem.productId,
                        quantity: cartItem.quantity + 1
                    };
                    // delete the item from wishlist
                    user.wishList.splice(indexW, 1);
                    isUpdated = true;
                    await user.save()
                    break;
                }
            }

            if (!isUpdated) {
                user.cart.push({
                    productId: wishlistItem.productId,
                    quantity: 1
                });
                user.wishList.splice(indexW, 1);
                await user.save()

            }
        }

        res.status(200).json({message: "Wishlist items now inside of your cart.", status: 200})
    } catch (err) {
        res.status(200).json({err: err.message, status: 400})
    }
}

module.exports = {
    insertAndExtract,
    getWishlist,
    getDetailedWishlist,
    deleteFromWishlist,
    transferIntoCart
}