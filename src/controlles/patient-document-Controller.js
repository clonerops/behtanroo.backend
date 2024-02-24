const PatientDocument = require("../models/patient_document")

const patientDocumentController = {
    createPatientDocument: async (req, res, next) => {
        const {documentId, patientId, description} = req.body 

        const result = await PatientDocument.create({
            documentId, 
            patientId, 
            description
        })

        return res.status(201).json({
            success: true,
            data: result
        })
    }
}

module.exports = patientDocumentController