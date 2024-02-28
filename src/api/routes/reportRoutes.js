const express = require('express') 
const reportController = require('../../controlles/reportController')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.get('/referralCount', authMiddleware.authenticateToken, reportController.patientListByFilterReferral)
router.get('/excelReferralCount', authMiddleware.authenticateToken, reportController.excelPatientListByFilterReferral)
router.get('/patient', authMiddleware.authenticateToken, reportController.patientListByFilter)
router.get('/excelPatient', authMiddleware.authenticateToken, reportController.excelPatientListByFilter)


module.exports = router