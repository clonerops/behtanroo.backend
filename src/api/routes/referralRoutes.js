const express = require('express') 
const referralController = require('../../controlles/referralController.js') 

const router = express.Router()

router.post('/create', referralController.createReferral)
router.get('/patient/:id', referralController.getAllReferral)
router.get('/patient/:patientId/document/:documentId', referralController.getAllReferralByDocumentAndPatient)


module.exports = router