const express = require('express')
const router = express.Router()
const userController = require('../Controllers/User.js')
const authMiddleware = require('../MiddleWares/Auth.js')

router.get('/users', authMiddleware, userController.getAllUsers)
router.get("/getUserMe", authMiddleware, userController.getUserMe)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router