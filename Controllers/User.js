const User = require('../Models/User.js')

const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    users && res.status(200).json(users)
}

const register = async (req, res) => {
    const newUser = new User(req.body)
    await bcrypt.hash(newUser.password, salt, async (err, hash) => {
        newUser.password = hash
        await newUser.save()
            .then(() => {
                res.status(200).json({message: `${newUser.email} is created successfully.`})
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    })

}


const login = async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if (user) {
        const comparePassword = await bcrypt.compare(password, user.password)

        if (comparePassword) {
            //if it is already connected
            if (req.cookies.auth) {
                res.status(400).json({message: "You are already logged in."})
            } else {
                //this is jwt and it's expires after 12 hour
                const jwtToken = jwt.sign({
                    email: email,
                    password: password
                }, process.env.JWT_SECRET, {expiresIn: "12h"})

                //for test purpose
                //res.cookie("auth", jwtToken, {maxAge: 9000000, httpOnly: true})

                res.status(200).json({message: "Login success", token: jwtToken})
            }
        } else {
            res.status(400).json({message: "Password is incorrect"})
        }

    } else {
        res.status(404).json({message: "User could not founded."})
    }
}

const logout = async (req, res) => {
    if (req.cookies.auth) {
        res.clearCookie("auth")
        res.status(200).json({message: "Logout successfully."})
    } else {
        res.status(400).json({message: "You need to log in before log out."})
    }
}
module.exports = {getAllUsers, register, login, logout}