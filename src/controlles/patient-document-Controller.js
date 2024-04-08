const { Op } = require("sequelize")
const Document = require("../models/document")
const Patient = require("../models/patient")
const PatientDocument = require("../models/patient_document")
const  base64_encode  = require("../api/middlewares/convertFileToBase64")
const Attachment = require("../models/attachment")

const patientDocumentController = {
    createPatientDocument: async (req, res, next) => {
        try {
            const { documentId, patientId, description } = req.body

            const result = await PatientDocument.create({
                documentId,
                patientId,
                description,
                documentCode: Math.floor(Math.random() * 1000000)
            })
    
            return res.status(201).json({
                success: true,
                data: result
            })
    
        } catch (error) {
            return res.status(500).json({
                success: true,
                data: error
            })
          
        }
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

                },
            ]
        })
        return res.status(200).json({
            success: true,
            data: results
        })

    },

    getPatientDocumnetById: async (req, res, next) => {
        const patientDocument = await PatientDocument.findOne({
            where: {
                [Op.and]: [{
                    patientId: req.params.patientId
                },
                {
                    documentId: req.params.documentId
                }],
            }, 
            // include: [Patient]
            include: [
                {
                    model: Patient,
                },
                {
                    model: Document,
                    attributes: ['id', 'title']

                },
                {
                    model: Attachment,
                    attributes: ['attachment']
                }
            ]

        })
        return res.status(200).json({
            success: true,
            data: patientDocument
        })
    },

    deletePatientDocument: async (req, res, next) => {
        try {
            const findPatiendDocument = await PatientDocument.findOne({
                where: {
                    [Op.and]: [
                        {
                            patientId: req.params.patientId,
                        },
                        {
                            documentId: req.params.documentId
                        }
                    ]
                }
            })

            if(!findPatiendDocument) {
                return res.status(400).json({
                    success: true,
                    message: "پرونده بیمار یافت نشد"
                })
            } else {
                findPatiendDocument.destroy()
                return res.status(200).json({
                    success: true,
                    message: "پرونده بیمار با موفقیت حذف گردید"
                })
            }

        } catch (error) {
            return res.status(500).json({ message: "Server Error" })
        }
    },
    uploadFile: async (req, res, next) => {
        try {
            const { patientId, documentId } = req.body

            const findAttach = await Attachment.findAll({
                where: {
                    [Op.and]: [{
                        patientId: patientId
                    },
                    {
                        documentId: documentId
                    }],
                }
            });
                    
            if(findAttach.length > 2) {
                return res.status(400).json({
                    message: 'خطا در آپلود فایل!'
                })
 
            } else {
                if(req.files.length > 1) {
                    req.files.map((item) => {
                        Attachment.create({
                            patientId,
                            documentId,
                            attachment: base64_encode(item.path)
                        });
                    }
                )
                    return res.status(200).json({ message: true });
                } else {
                    await Attachment.create({
                    patientId,
                    documentId,
                    attachment: base64_encode(req.files[0].path)
                });
                return res.status(200).json({ message: true });

                }        
            }
    
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = patientDocumentController