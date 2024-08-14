const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    imageId: {type: Array, required: true, unique: true, default: null},
    categoryId: {type: Array, required: true, default: null},
    name: {type: String, trim: true, required: true},
    description: {type: String, required: true, default: null},
    colorOptions: {type: Array, required: true, default: null},
    sizeOptions: {type: Array, required: true, default: null},
    price: {type: String, trim: true, required: true},
    quantity: {type: String, trim: true, required: true},
    votes: {type: String, trim: true, required: false, default: 0},
    stars: {type: String, trim: true, required: false, default: 0},
    isDiscounted: {type: Boolean, required: true, default: false},
    discountPercentage: {type: String, required: false},

}, {timestamps: true})


module.exports = mongoose.model('products', productSchema)