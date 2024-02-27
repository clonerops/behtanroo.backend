const express = require('express')
const patientDocumentController = require('../../controlles/patient-document-Controller')

const router = express.Router()

router.post('/', patientDocumentController.createPatientDocument)
router.get('/', patientDocumentController.listOfPatientDocument)
router.get('/:id', patientDocumentController.getPatientDocumnetById)

module.exports = router