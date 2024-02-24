const express = require('express')
const patientDocumentController = require('../../controlles/patient-document-Controller')

const router = express.Router()

router.post('/', patientDocumentController.createPatientDocument)

module.exports = router