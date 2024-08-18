const mongoose = require('mongoose')

const connect = async (req, res) => {
    await mongoose.connect(process.env.MONGO_URI + process.env.COLLECTION_NAME)
        .then(e => {
            console.log("Connected to the database".underline.cyan)
        })
        .catch(err => err)
}

module.exports = connect