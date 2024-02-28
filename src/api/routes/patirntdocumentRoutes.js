const express = require('express')
const patientDocumentController = require('../../controlles/patient-document-Controller')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.post('/', authMiddleware.authenticateToken, patientDocumentController.createPatientDocument)
router.get('/', authMiddleware.authenticateToken, patientDocumentController.listOfPatientDocument)
router.get('/:id', authMiddleware.authenticateToken, patientDocumentController.getPatientDocumnetById)

module.exports = router