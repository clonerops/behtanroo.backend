const Document = require("../models/document")
const Patient = require("../models/patient")
const PatientDocument = require("../models/patient_document")

const patientDocumentController = {
    createPatientDocument: async (req, res, next) => {
        const {documentId, patientId, description} = req.body 

        const result = await PatientDocument.create({
            documentId, 
            patientId, 
            description,
            documentCode: Math.floor(Math.random()*1000000)
        })

        return res.status(201).json({
            success: true,
            data: result
        })
    },

    listOfPatientDocument: async (req, res, next) => {
        const results = await PatientDocument.findAll({
            include: [
                {
                    model: Patient,
                    attributes: ['id', 'firstName', 'lastName', 'patientCode', 'nationalCode']
                },
                {
                    model: Document,
                    attributes: ['id', 'title']

                }
            ]
        })
        return res.status(200).json({
            success: true,
            data: results
        })

    }
}

module.exports = patientDocumentController