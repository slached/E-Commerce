const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Product = require("../Models/Product");
const Image = require("../Models/Image");

const getCart = async (req, res) => {

    try {
        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)

        const response = []
        for (productInsideCart of user.cart) {
            const product = await Product.findById(productInsideCart.productId)
            const image = await Image.findById(product.imageId)
            response.push({product: product, quantity: productInsideCart.quantity, url: image.url})
        }

        res.status(200).json({cart: response, status: 200})

    } catch (err) {
        res.status(200).json({err: err, status: 400})
    }

}

const addCart = async (req, res) => {

    try {
        let {_id, name, increaseQuantity} = req.body

        if (!increaseQuantity) increaseQuantity = 1

        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)

        //these will look for if the item still exist on current user's cart
        let isInCart = false
        let itemInTheCart = {}

        for (const [index, cartItem] of user.cart.entries()) {

            if (cartItem.productId === _id) {
                itemInTheCart = {
                    productId: cartItem.productId,
                    index: index
                }
                isInCart = true
                break
            }
        }

        if (isInCart) {
            //if item already in the cart so just increase amount of the item
            const increasedQuantity = user.cart[itemInTheCart.index].quantity += increaseQuantity
            user.cart[itemInTheCart.index] = {
                productId: _id,
                quantity: increasedQuantity
            }
            await user.save()
            res.status(200).json({message: `${name} increased amount successfully.`, status: 200})

        } else {
            const newItem = {
                productId: _id,
                quantity: increaseQuantity
            }
            user.cart.push(newItem)
            await user.save()
            res.status(200).json({message: `${name} added into your cart successfully.`, status: 200})

        }

    } catch (err) {
        console.log(err)
        res.status(200).json({err: err, status: 400})
    }

}

const updateCart = async (req, res) => {
    try {
        const productId = req.params.id
        const {quantity} = req.body

        const id = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(id)

        let isFounded = false
        const updatedCart = []
        for (eachCartItem of user.cart) {
            if (eachCartItem.productId === productId) {
                if (quantity) {
                    eachCartItem = {
                        productId: productId,
                        quantity: quantity
                    }
                } else {
                    return res.status(200).json({
                        message: `${productId} cannot updated because quantity is invalid`,
                        status: 400
                    })
                }
                isFounded = true
            }
            updatedCart.push(eachCartItem)
        }

        //if product find inside of cart update the cart
        if (isFounded) {
            user.cart = updatedCart
            await user.save()
        }

        if (!isFounded) res.status(200).json({
            err: `id ${productId} could not founded inside your cart`,
            status: 400
        })
        else res.status(200).json({message: `${productId} increased successfully`, status: 200})

    } catch (err) {
        console.log(err)
        res.status(200).json({err: err, status: 400})
    }
}

const deleteFromCart = async (req, res) => {

    try {
        const deletedProductId = req.params.id
        const id = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(id)

        const deletedArr = []
        let isAnyChanges = false
        for (let cartItem of user.cart) {
            if (cartItem.productId === deletedProductId) {
                //do not append deleted element
                isAnyChanges = true
            } else {
                deletedArr.push(cartItem)
            }
        }

        if (isAnyChanges) {
            user.cart = deletedArr
            await user.save()
            res.status(200).json({message: `${deletedProductId} deleted successfully.`, status: 200})
        } else {
            res.status(200).json({
                err: `${deletedProductId} could not founded.`,
                status: 404
            })
        }

    } catch (err) {
        return res.status(200).json({
            err: err.message,
            status: 400
        })
    }


}

module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteFromCart
}