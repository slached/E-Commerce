const mongoose = require('mongoose')

const emailRegExp = (email) => {
    const emailRegEx = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
    return emailRegEx.test(email)
}

const userSchema = new mongoose.Schema({

    image: {data: Buffer, type: String, defaultValue: ""},
    name: {
        type: String, trim: true, required: true
    },
    email: {
        type: String, trim: true, required: true, unique: true, validate: {
            validator: emailRegExp, message: "This format of email is not valid."
        }
    }, password: {type: String, trim: true, required: true},
    wishList: {type: Array, required: false}

}, {timestamps: true})


module.exports = mongoose.model('users', userSchema)