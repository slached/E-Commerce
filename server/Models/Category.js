const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, unique: true}, imageID: {type: String, required: true, trim: true},
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('categories', CategorySchema)