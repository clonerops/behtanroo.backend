const express = require('express') 
const doctorController = require('../../controlles/doctorController.js') 
const authMiddleware = require('../middlewares/auth.js')

const router = express.Router()

router.post('/create', authMiddleware.authenticateToken, doctorController.createDoctor)
router.get('/lists', authMiddleware.authenticateToken, doctorController.getAllDoctors)
router.delete('/:id', authMiddleware.authenticateToken, doctorController.deleteDoctor)


module.exports = router