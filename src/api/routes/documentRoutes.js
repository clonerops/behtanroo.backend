const express = require('express')
const documentController = require('../../controlles/documentController.js') 
const authMiddleware = require('../middlewares/auth.js')

const router = express.Router()

router.post('/', authMiddleware.authenticateToken, documentController.addDocument)
router.get('/', authMiddleware.authenticateToken,documentController.getDocuments)
router.get('/:id', authMiddleware.authenticateToken,documentController.getDocument)

module.exports = router