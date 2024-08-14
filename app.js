require('dotenv').config()

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

//db connection
const connect = require('./server/config/database.js')
connect().then(() => {
    app.listen(port)
    console.log(`app listening on port ${port}`)
})

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
}

//mw
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

//router imports
const userRouter = require('./server/Routers/User.js')
const productRouter = require('./server/Routers/Product.js')
const imageRouter = require('./server/Routers/Image.js')
const cartRouter = require('./server/Routers/Cart.js')
const wishlistRouter = require('./server/Routers/Wishlist.js')
const categoryRouter = require('./server/Routers/Category.js')

//router connections
app.use(process.env.BASE_PATH, userRouter)
app.use(`${process.env.BASE_PATH}/cart`, cartRouter)
app.use(`${process.env.BASE_PATH}/product`, productRouter)
app.use(`${process.env.BASE_PATH}/image`, imageRouter)
app.use(`${process.env.BASE_PATH}/wishlist`, wishlistRouter)
app.use(`${process.env.BASE_PATH}/category`, categoryRouter)