const mongoose = require('mongoose')

const connectToTheDb = async (req, res, next) => {
    await mongoose.connect(process.env.MONGO_URI + process.env.COLLECTION_NAME)
        .then(e => {
            next()
        })
        .catch(err => err)
}

module.exports = connectToTheDb