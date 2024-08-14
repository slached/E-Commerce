const express = require('express')
const router = express.Router()
const userController = require('../Controllers/User.js')
const authMiddleware = require('../MiddleWares/Auth.js')

router.get('/users', authMiddleware.isAdmin, userController.getAllUsers)
router.get("/getUserMe", authMiddleware.isUser, userController.getUserMe)

router.patch('/update/:id', authMiddleware.isAdmin, userController.update)
router.patch('/updatePassword/:id', authMiddleware.isUser, userController.updatePassword)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router