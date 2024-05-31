require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI + process.env.COLLECTION_NAME)
    .then(e => {
        app.listen(port)
        console.log(`App listening on port ${port}`)
    })
    .catch(err => err)

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
}

//mw
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

//user router
const userRouter = require('./Routers/User.js')

//router connections
app.use(process.env.BASE_PATH, userRouter)

