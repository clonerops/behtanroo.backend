const express = require('express') 
const referralController = require('../../controlles/referralController.js') 

const router = express.Router()

router.post('/create', referralController.createReferral)
router.get('/patient/:id', referralController.getAllReferral)


module.exports = router