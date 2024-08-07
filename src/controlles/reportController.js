const { Op, literal } = require("sequelize");
const Patient = require("../models/patient");
const PatientDocument = require("../models/patient_document");
const moment = require("jalali-moment")
const exceljs = require('exceljs');
const Referral = require("../models/referral");
const Document = require("../models/document");

const reportController = {
    patientListByFilter: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate } = req.query;

            const utcFromDate = moment(fromDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');
            const utcToDate = moment(toDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');

            let patients = []

            const patientsResult = await PatientDocument.findAll({
                where: {
                    isDeleted: false,
                    [documentId != 0 ? Op.and : Op.or]: [
                        {
                            createdAt: {
                                [Op.between]: [utcFromDate, utcToDate]
                            }
                        },

                        {
                            documentId: documentId == 0 ? null : documentId
                        }
                    ]

                }, include: [
                    { model: Patient },
                    { model: Document },
                ]
            })
            patientsResult.forEach((item, index) => {
                let mergedPatient = {
                    id: item.patientId,
                    documentCode: item.documentCode,
                    firstName: item.patient.firstName,
                    lastName: item.patient.lastName,
                    patientCode: item.patient.patientCode,
                    gender: item.patient.gender,
                    nationalCode: item.patient.nationalCode,
                    mobile: item.patient.mobile,
                    tel: item.patient.tel,
                    mobile2: item.patient.mobile2,
                    address: item.patient.address,
                    document: item.document,
                };
                patients.push(mergedPatient);
            })
            res.status(200).json({
                message: true,
                data: patients
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    excelPatientListByFilter: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate } = req.query;

            const utcFromDate = moment(fromDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');
            const utcToDate = moment(toDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');

            let patients = []

            const patientsResult = await PatientDocument.findAll({
                where: {
                    isDeleted: false,
                    [documentId != 0 ? Op.and : Op.or]: [
                        {
                            createdAt: {
                                [Op.between]: [utcFromDate, utcToDate]
                            }
                        },

                        {
                            documentId: documentId == 0 ? null : documentId
                        }
                    ]

                }, include: [
                    { model: Patient },
                    { model: Document },
                ]
            })
            patientsResult.forEach((item, index) => {
                let mergedPatient = {
                    documentCode: item.documentCode,
                    firstName: item.patient.firstName,
                    lastName: item.patient.lastName,
                    patientCode: item.patient.patientCode,
                    gender: item.patient.gender,
                    nationalCode: item.patient.nationalCode,
                    mobile: item.patient.mobile,
                    tel: item.patient.tel,
                    mobile2: item.patient.mobile2,
                    address: item.patient.address,
                    title: item.document.title
                };
                patients.push(mergedPatient);
            })

            if (patients.length > 0) {
                let workSheet = new exceljs.Workbook()
                const sheet = workSheet.addWorksheet("patients")
                sheet.columns = [
                    { header: "شماره بیمار", key: 'patientCode', width: 12, },
                    { header: "شماره پرونده", key: 'documentCode', width: 12, },
                    { header: "نوع پرونده", key: 'title', width: 12, },
                    { header: "نام", key: 'firstName', width: 16 },
                    { header: "نام خانوادگی", key: 'lastName', width: 18 },
                    { header: "کدملی", key: 'nationalCode', width: 16 },
                    { header: "تلفن همراه", key: 'mobile', width: 16 },
                    { header: "تلفن همراه ضروری", key: 'mobile2', width: 16 },
                    { header: "تلفن منزل", key: 'tel', width: 16 },
                    { header: "جنسیت", key: 'gender', width: 4 },
                    { header: "آدرس", key: 'address', width: 16 },
                ]
                sheet.getColumn('patientCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('documentCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('title').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('firstName').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('lastName').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('nationalCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('mobile').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('mobile2').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('tel').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('gender').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('address').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });

                patients.map((value, index) => {
                    sheet.addRow({
                        patientCode: value.patientCode,
                        documentCode: value.documentCode,
                        title: value.title,
                        firstName: value.firstName,
                        lastName: value.lastName,
                        nationalCode: value.nationalCode,
                        mobile: value.mobile,
                        mobile2: value.mobile2,
                        tel: value.tel,
                        gender: value.gender,
                        address: value.address,
                    })
                })
                res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats.officedocument.spreadsheetml.sheet"
                )
                res.setHeader(
                    "Content-Disposition",
                    "attachment;filename=" + "patient.xlsx"
                )
                const buffer = await workSheet.xlsx.writeBuffer();
                res.send(buffer);
            } else {
                return res.status(400).json({
                    message: "داده ای برای نمایش وجود ندارد"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    patientListByFilterReferral: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate, fromCount, toCount } = req.query;
            const utcFromDate = moment(fromDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');
            const utcToDate = moment(toDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');

            // const patients = await Patient.findAll({
            //     where: documentId != 0 ? {
            //         [Op.and]: 
            //         {
            //             '$documents.id$': documentId != 0 ? documentId : null,
            //         },
            //         createdAt: {
            //             [Op.between]: [utcFromDate, utcToDate]
            //         }
            //     } : {
            //         createdAt: {
            //             [Op.between]: [utcFromDate, utcToDate]
            //         }
            //     },
            //     group: ['patient.id'],
            //     having: literal(`COUNT(referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
            //     include: documentId != 0 ? [
            //         {
            //             model: Referral,
            //             attributes: [],
            //             required: false // Full join

            //         },
            //         {
            //             model: Document,
            //             // attributes: [],
            //             required: false // Full join

            //         },
            //     ] : [
            //         {
            //             model: Referral,                
            //             attributes: [],
            //             required: false // Full join
            //         },
            //     ]
            // })
            console.log(documentId)
            const patients = await PatientDocument.findAll({
                where: documentId != 0 ? {
                    documentId: documentId,
                    createdAt: {
                        [Op.between]: [utcFromDate, utcToDate]
                    }
                } : {
                    createdAt: {
                        [Op.between]: [utcFromDate, utcToDate]
                    }
                },
                include: [
                    { model: Document },
                    {
                        model: Patient,
                        required: false,
                        include: [
                            {
                                model: Referral,
                            }
                        ]
                    }
                ]
            })

            // Filter patients based on the count of referrals
            const filteredPatients = patients.filter(patientDocument => {
                const referralCount = patientDocument.patient.referrals.length;
                return referralCount >= fromCount && referralCount <= toCount;
            });

            console.log(patients)

            return res.status(200).json({
                message: true,
                data: filteredPatients
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "server is error",
            });

        }
    },

    excelPatientListByFilterReferral: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate, fromCount, toCount } = req.query;

            const utcFromDate = moment(fromDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');
            const utcToDate = moment(toDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD 23:59:59');

            // const patients = await Patient.findAll({
            //     where: documentId != 0 ? {
            //         [Op.and]:
            //         {
            //             '$documents.id$': documentId != 0 ? documentId : null,
            //         },
            //         createdAt: {
            //             [Op.between]: [utcFromDate, utcToDate]
            //         }
            //     } : {
            //         createdAt: {
            //             [Op.between]: [utcFromDate, utcToDate]
            //         }
            //     },
            //     group: ['patient.id'],
            //     having: literal(`COUNT(referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
            //     include: documentId != 0 ? [
            //         {
            //             model: Referral,
            //             attributes: []

            //         },
            //         {
            //             model: Document,
            //             attributes: []

            //         },
            //     ] : {
            //         model: Referral,
            //         attributes: []
            //     },
            // })

            const patients = await PatientDocument.findAll({
                where: documentId != 0 ? {
                    documentId: documentId,
                    isDeleted: false,
                    createdAt: {
                        [Op.between]: [utcFromDate, utcToDate]
                    }
                } : {
                    createdAt: {
                        [Op.between]: [utcFromDate, utcToDate]
                    }
                },
                include: [
                    { model: Document },
                    {
                        model: Patient,
                        required: false,
                        include: [
                            {
                                model: Referral,
                            }
                        ]
                    }
                ]
            })

            // Filter patients based on the count of referrals
            const filteredPatients = patients.filter(patientDocument => {
                const referralCount = patientDocument.patient.referrals.length;
                return referralCount >= fromCount && referralCount <= toCount;
            });



            if (filteredPatients.length > 0) {
                let workSheet = new exceljs.Workbook()
                const sheet = workSheet.addWorksheet("patients")
                sheet.columns = [
                    { header: "شماره بیمار", key: 'patientCode', width: 12, },
                    { header: "شماره پرونده", key: 'documentCode', width: 12, },
                    { header: "نوع پرونده", key: 'title', width: 12, },
                    { header: "نام", key: 'firstName', width: 16 },
                    { header: "نام خانوادگی", key: 'lastName', width: 18 },
                    { header: "کدملی", key: 'nationalCode', width: 16 },
                    { header: "تلفن همراه", key: 'mobile', width: 16 },
                    { header: "تلفن همراه ضروری", key: 'mobile2', width: 16 },
                    { header: "تلفن منزل", key: 'tel', width: 16 },
                    { header: "جنسیت", key: 'gender', width: 4 },
                    { header: "آدرس", key: 'address', width: 16 },
                ]
                sheet.getColumn('patientCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('documentCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('title').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('firstName').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('lastName').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('nationalCode').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('mobile').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('mobile2').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('tel').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('gender').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });
                sheet.getColumn('address').eachCell({ includeEmpty: true }, cell => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '69F080' } };
                });

                filteredPatients.map((value, index) => {
                    sheet.addRow({
                        documentCode: value.documentCode,
                        patientCode: value.patient.patientCode,
                        firstName: value.patient.firstName,
                        lastName: value.patient.lastName,
                        nationalCode: value.patient.nationalCode,
                        mobile: value.patient.mobile,
                        mobile2: value.patient.mobile2,
                        tel: value.patient.tel,
                        gender: value.patient.gender,
                        address: value.patient.address,
                        title: value.document.title

                    })
                })
                res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats.officedocument.spreadsheetml.sheet"
                )
                res.setHeader(
                    "Content-Disposition",
                    "attachment;filename=" + "patient.xlsx"
                )
                const buffer = await workSheet.xlsx.writeBuffer();
                res.send(buffer);
            } else {
                return res.status(400).json({
                    message: "داده ای برای نمایش وجود ندارد"
                })
            }

        } catch (error) {
            return res.status(500).json({
                message: "server is error",
            });
        }
    }
};

module.exports = reportController;
