const express = require('express') 
const reportController = require('../../controlles/reportController')

const router = express.Router()

router.get('/patient', reportController.patientListByFilter)


module.exports = router