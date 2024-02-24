const Document = require('../models/document')

const documentController = {
    addDocument: async (req, res, next) => {
        const { title } = req.body;

        const document = await Document.create({title})
        return res.status(201).json({
            success: true,
            data: document
        })
    },

    getDocuments: async (req, res, next) => {
        const documents = await Document.findAll()
        return res.status(200).json({
            success: true,
            data: documents
        })
    }
}

module.exports = documentController