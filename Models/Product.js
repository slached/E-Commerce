const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    imageId: {type: String, required: true, unique: true},
    name: {type: String, trim: true, required: true},
    price: {type: String, trim: true, required: true},
    type: {type: String, trim: true, required: true},
    quantity: {type: String, trim: true, required: true},
    votes: {type: String, trim: true, required: false, default: 0},
    stars: {type: String, trim: true, required: false, default: 0},
    isDiscounted: {type: Boolean, required: true, default: false},
    discountPercentage: {type: String, required: false},

}, {timestamps: true})


module.exports = mongoose.model('products', productSchema)