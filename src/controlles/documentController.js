const Document = require('../models/document')

const documentController = {
    addDocument: async (req, res, next) => {
        const { title } = req.body;

        const document = await Document.create({ title })
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
    },

    getDocument: async (req, res, next) => {
        const document = await Document.findOne({ where: { id: req.params.id } })
        return res.status(200).json({
            success: true,
            data: document
        })
    },

    updateDocument: async (req, res, next) => {
        const findDocument = await Document.findOne({ where: { id: req.params.id } })
        if (!findDocument) {
            return res.status(400).json({
                success: false,
                message: "پرونده یافت نشد"
            })
        } else {
            await findDocument.update({ title: req.body.title })
            return res.status(200).json({ success: true })
        }
    },

    deleteDocument: async (req, res, next) => {
        const findDocument = await Document.findOne({ where: { id: req.params.id } })
        if (!findDocument) {
            return res.status(400).json({
                success: false,
                message: "پرونده یافت نشد"
            })
        } else {
            await findDocument.destroy()
            return res.status(200).json({ success: true })
        }
    },


}

module.exports = documentController