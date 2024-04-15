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
            ]

        })

        const findAttachements = await Attachment.findAll({
            where: {
                [Op.and]: [{
                    patientId: req.params.patientId
                },
                {
                    documentId: req.params.documentId
                }],
            }, 
        })
        return res.status(200).json({
            success: true,
            data: {
                documentCode: patientDocument?.documentCode,
                document: {
                    id: patientDocument?.document.id,  
                    title: patientDocument?.document.title,  
                },
                patient: {
                    id: patientDocument?.patient.id,  
                    address: patientDocument?.patient.address,  
                    job: patientDocument?.patient.job,  
                    education: patientDocument?.patient.education,  
                    maritalStatus: patientDocument?.patient.maritalStatus,  
                    representative: patientDocument?.patient.representative,  
                    tel: patientDocument?.patient.tel,  
                    mobile2: patientDocument?.patient.mobile2,  
                    firstName: patientDocument?.patient.firstName,  
                    lastName: patientDocument?.patient.lastName,  
                    mobile: patientDocument?.patient.mobile,  
                    nationalCode: patientDocument?.patient.nationalCode,  
                    patientCode: patientDocument?.patient.patientCode,  
                },
                attachments: findAttachements
            },
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
    
    // uploadFile: async (req, res, next) => {
    //     try {
    //         const { patientId, documentId } = req.body

    //         const findAttach = await Attachment.findAll({
    //             where: {
    //                 [Op.and]: [{
    //                     patientId: patientId
    //                 },
    //                 {
    //                     documentId: documentId
    //                 }],
    //             }
    //         });

    //         console.log(findAttach)
                    
    //         if(findAttach.length > 2) {
    //             return res.status(400).json({
    //                 message: 'خطا در آپلود فایل!'
    //             })
 
    //         } else {
    //             if(req.files.length > 1) {
    //                 req.files.map((item) => {
    //                     Attachment.create({
    //                         patientId,
    //                         documentId,
    //                         attachment: base64_encode(item.path)
    //                     });
    //                 }
    //             )
    //                 return res.status(200).json({ message: true });
    //             } else {
    //                 await Attachment.create({
    //                 patientId,
    //                 documentId,
    //                 attachment: base64_encode(req.files[0].path)
    //             });
    //             return res.status(200).json({ message: true });

    //             }        
    //         }
    
    //     } catch (error) {
    //         console.log(error)
    //         return error
    //     }
    // }

    // uploadFile: async (req, res, next) => {
    //     try {
    //         const { patientId, documentId } = req.body
    
    //         const existingAttachment = await Attachment.findOne({
    //             where: {
    //                 [Op.and]: [{
    //                     patientId: patientId
    //                 },
    //                 {
    //                     documentId: documentId
    //                 }],
    //             }
    //         });
    
    //         if (existingAttachment) {
    //             // Update existing attachment
    //             if (req.files && req.files.length > 0) {
    //                 if (req.files.length > 1) {
    //                     req.files.forEach(async (item) => {
    //                         await existingAttachment.update({
    //                             attachment: base64_encode(item.path)
    //                         });
    //                     });
    //                 } else {
    //                     await existingAttachment.update({
    //                         attachment: base64_encode(req.files[0].path)
    //                     });
    //                 }
    //             } else {
    //                 // Handle delete attachment
    //                 await existingAttachment.destroy();
    //             }
    //             return res.status(200).json({ message: "Attachment updated successfully" });
    //         } else {
    //             // Create new attachment
    //             if (req.files && req.files.length > 0) {
    //                 if (req.files.length > 1) {
    //                     req.files.forEach(async (item) => {
    //                         await Attachment.create({
    //                             patientId,
    //                             documentId,
    //                             attachment: base64_encode(item.path)
    //                         });
    //                     });
    //                 } else {
    //                     await Attachment.create({
    //                         patientId,
    //                         documentId,
    //                         attachment: base64_encode(req.files[0].path)
    //                     });
    //                 }
    //                 return res.status(200).json({ message: "Attachment created successfully" });
    //             } else {
    //                 return res.status(400).json({ message: "No file provided" });
    //             }
    //         }
        
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ message: "Internal server error" });
    //     }
    // }
    
    uploadFile: async (req, res, next) => {
        try {
            const { patientId, documentId } = req.body
    
            // Delete all existing attachments for the specified patientId and documentId
            await Attachment.destroy({
                where: {
                    patientId: patientId,
                    documentId: documentId
                }
            });
    
            // Add new attachments if files are provided
            if (req.files && req.files.length > 0) {
                const attachments = req.files.map(file => ({
                    patientId: patientId,
                    documentId: documentId,
                    attachment: base64_encode(file.path)
                }));
                await Attachment.bulkCreate(attachments);
                return res.status(200).json({ message: "Attachments updated successfully" });
            } else {
                return res.status(400).json({ message: "No file provided" });
            }
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
}

module.exports = patientDocumentController