const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    imageId: {type: String, required: true},
    name: {type: String, trim: true, required: true},
    price: {type: String, trim: true, required: true},
    type: {type: String, trim: true, required: true},
    quantity: {type: String, trim: true, required: true},

}, {timestamps: true})


module.exports = mongoose.model('products', productSchema)