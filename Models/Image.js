const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({

    name: {type: String, required: true},
    contentType: {type: String, required: true},
    path: {type: String, required: true},
    image: {type: String, required: true, unique: true},

})

module.exports = mongoose.model('images', ImageSchema)