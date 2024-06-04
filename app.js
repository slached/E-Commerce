require('dotenv').config()

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

//db connection
const dbConnection = require('./MiddleWares/DbConnection.js')
app.use(dbConnection)

app.listen(port)
console.log(`app listening on port ${port}`)

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
}

//mw
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

//router imports
const userRouter = require('./Routers/User.js')
const productRouter = require('./Routers/Product.js')
const imageRouter = require('./Routers/Image.js')

//router connections
app.use(process.env.BASE_PATH, userRouter)
app.use(`${process.env.BASE_PATH}/product`, productRouter)
app.use(`${process.env.BASE_PATH}/image`, imageRouter)
