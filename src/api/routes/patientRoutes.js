const express = require('express') 
const patientController = require('../../controlles/patientController.js') 

const router = express.Router()

router.post('/create', patientController.createPatient)
router.get('/exportExcel', patientController.exportExcelPatientList)
router.get('/lists', patientController.getAllPatients)
router.get('/:id', patientController.getPatientsById)
router.get('/:id/referral', patientController.getPatientReferralById)


module.exports = router