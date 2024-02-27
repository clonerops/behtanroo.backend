const express = require('express') 
const reportController = require('../../controlles/reportController')

const router = express.Router()

router.get('/referralCount', reportController.patientListByFilterReferral)
router.get('/patient', reportController.patientListByFilter)
router.get('/excelPatient', reportController.excelPatientListByFilter)


module.exports = router