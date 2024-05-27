const express = require('express')
const router = express.Router()
const userController = require('../Controllers/User.js')

router.get('/users', require('../MiddleWares/Auth.js'), userController.getAllUsers)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router