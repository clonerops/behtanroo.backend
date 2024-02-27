const { Op, literal } = require("sequelize");
const Patient = require("../models/patient");
const PatientDocument = require("../models/patient_document");
const moment = require("jalali-moment")

const reportController = {
    patientListByFilter: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate } = req.query;
            
            const utcFromDate = moment(fromDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');
            const utcToDate = moment(toDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');

            let patients = []

            const patientsResult = await PatientDocument.findAll({
                where: {
                    [documentId ? Op.and : Op.or]: [
                        {
                            createdAt: {
                                [Op.between]: [utcFromDate, utcToDate]
                            }
                        },

                        {
                            documentId: documentId === undefined ? null : documentId
                        }
                    ]

                }, include: { model: Patient }
            })
            patientsResult.forEach((item, index) => patients.push(item.patient))
            res.status(200).json({
                message: true,
                data: patients
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = reportController;
