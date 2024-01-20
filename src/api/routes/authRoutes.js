const express = require('express')
const authController = require('../../controlles/authController.js') 

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

module.exports = router