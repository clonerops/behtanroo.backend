import express from 'express'
import patientController from '../../controlles/patientController'

const router = express.Router()

router.post('/create', patientController.createPatient)
router.get('/lists', patientController.getAllPatients)
router.get('/:id', patientController.getPatientsById)
router.get('/:id/referral', patientController.getPatientReferralById)


export default router