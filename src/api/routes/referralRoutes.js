const express = require('express') 
const referralController = require('../../controlles/referralController.js') 
const authMiddleware = require('../middlewares/auth.js')

const router = express.Router()

router.post('/create', authMiddleware.authenticateToken, referralController.createReferral)
router.get('/patient/:id', authMiddleware.authenticateToken, referralController.getAllReferral)
router.get('/patient/:patientId/document/:documentId', authMiddleware.authenticateToken, referralController.getAllReferralByDocumentAndPatient)


module.exports = router