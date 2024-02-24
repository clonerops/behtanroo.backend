const express = require('express')
const documentController = require('../../controlles/documentController.js') 

const router = express.Router()

router.post('/', documentController.addDocument)
router.get('/', documentController.getDocuments)

module.exports = router