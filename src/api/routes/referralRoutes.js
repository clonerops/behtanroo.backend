import express from 'express'
import referralController from '../../controlles/referralController'

const router = express.Router()

router.post('/create', referralController.createReferral)
router.get('/patient/:id', referralController.getAllReferral)


export default router