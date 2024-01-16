import express from 'express'
import authController from '../../controlles/authController'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

export default router