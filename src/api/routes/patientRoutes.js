const express = require('express') 
const patientController = require('../../controlles/patientController.js') 
const authMiddleware = require('../middlewares/auth.js')

const router = express.Router()

router.post('/create', authMiddleware.authenticateToken, patientController.createPatient)
router.put('/:id/edit', authMiddleware.authenticateToken, patientController.editPatient)
router.get('/exportExcel', authMiddleware.authenticateToken, patientController.exportExcelPatientList)
router.get('/lists', authMiddleware.authenticateToken, patientController.getAllPatients)
router.get('/:id', authMiddleware.authenticateToken, patientController.getPatientsById)
router.get('/:id/referral', authMiddleware.authenticateToken, patientController.getPatientReferralById)


module.exports = router