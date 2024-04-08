const express = require('express')
const patientDocumentController = require('../../controlles/patient-document-Controller')
const authMiddleware = require('../middlewares/auth')
const uploadFile = require('../middlewares/uploadImage')

const router = express.Router()

router.post('/', authMiddleware.authenticateToken, patientDocumentController.createPatientDocument)
router.get('/', authMiddleware.authenticateToken, patientDocumentController.listOfPatientDocument)
router.get('/patient/:patientId/document/:documentId', authMiddleware.authenticateToken, patientDocumentController.getPatientDocumnetById)
router.delete('/patient/:patientId/document/:documentId', authMiddleware.authenticateToken, patientDocumentController.deletePatientDocument)
router.put('/uploadFile', authMiddleware.authenticateToken, uploadFile.array('attachment', 2), patientDocumentController.uploadFile)

module.exports = router