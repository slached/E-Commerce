const mongoose = require('mongoose')

const emailRegExp = (email) => {
    return new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(email)
}

const userSchema = new mongoose.Schema({

    image: {type: String, defaultValue: ""},
    name: {
        type: String, trim: true, required: true
    },
    email: {
        type: String, trim: true, required: true, unique: true, validate: {
            validator: emailRegExp,
            message: "This format of email is not valid."
        }
    },
    password: {type: String, trim: true, required: true},
    wishList: {type: Array, required: false, default: []},
    cart: {type: Array, required: false, default: []},
    address: {type: String, required: false, default: null},
    role: {type: String, required: true, default: "user"},

}, {timestamps: true})


module.exports = mongoose.model('users', userSchema)