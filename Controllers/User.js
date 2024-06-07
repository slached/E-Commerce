const User = require('../Models/User.js')

const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('jsonwebtoken')
const {isValidObjectId} = require("mongoose");

const getAllUsers = async (req, res) => {
    const users = await User.find()
    users ? res.status(200).json(users) : res.status(200).json({message:"There is no any user."})
}

const register = async (req, res) => {
    const newUser = new User(req.body)
    await bcrypt.hash(newUser.password, salt, async (err, hash) => {
        newUser.password = hash
        await newUser.save()
            .then(() => {
                res.status(200).json({message: `${newUser.email} is created successfully.`, status: 200})
            })
            .catch(err => {
                res.status(200).json({err: err.message, status: 400})
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
                res.status(200).json({message: "You are already logged in.", status: 400})
            } else {
                //is user has valid id
                if (isValidObjectId(user._id)) {
                    //this is jwt and it's expires after 12 hour
                    const jwtToken = jwt.sign({
                        //user id to payload
                        id: user._id.toString()
                    }, process.env.JWT_SECRET, {expiresIn: "12h"})

                    res.status(200).json({message: "Login success", token: jwtToken, status: 200})
                }
            }
        } else {
            password === "" ? res.status(200).json({
                message: "Please enter a password.",
                status: 400
            }) : res.status(200).json({message: "Password is incorrect!", status: 400})

        }

    } else {
        if (email.length === 0) {
            res.status(200).json({message: "Please enter an email.", status: 404})
        } else res.status(200).json({message: "This email does not exists.", status: 404})
    }
}

const logout = async (req, res) => {
    if (req.cookies.auth) {
        res.clearCookie("auth")
        res.status(200).json({message: "Logout successfully."})
    } else {
        res.status(200).json({message: "You need to log in before log out.", status: 400})
    }
}

const getUserMe = async (req, res) => {

    try {
        const userId = jwt.verify(req.cookies.auth, process.env.JWT_SECRET).id
        const user = await User.findById(userId)
        res.status(200).json({user: user, status: 200})

    } catch (err) {
        res.status(200).json({err: err, status: 400})
    }

}

module.exports = {getAllUsers, register, login, logout, getUserMe}