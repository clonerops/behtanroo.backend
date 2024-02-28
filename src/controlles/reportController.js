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
    },

    excelPatientListByFilter: async (req, res, next) => {
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

            if (patients.length > 0) {
                let workSheet = new exceljs.Workbook()
                const sheet = workSheet.addWorksheet("patients")
                sheet.columns = [
                    { header: "شماره بیمار", key: 'patientCode', width: 12, },
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
        const { documentId, fromCount, toCount } = req.query;

        const patients = documentId !== undefined ?  await Patient.findAll({
            include: [
                {
                    model: Referral,
                    attributes: []
                },
                {
                    model: Document,
                    attributes: []
                },
            ],
            where: {
                '$documents.id$': documentId ? documentId : null,
            },
            group: ['Patient.id'],
            having: literal(`COUNT(Referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
        }) : await Patient.findAll({
            include: [
                {
                    model: Referral,
                    attributes: []
                },
            ],
            group: ['Patient.id'],
            having: literal(`COUNT(Referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
        });

        return res.status(200).json({
            message: true,
            data: patients
        });
    },

    excelPatientListByFilterReferral: async (req, res, next) => {
        const { documentId, fromCount, toCount } = req.query;

        const patients = documentId !== undefined ?  await Patient.findAll({
            include: [
                {
                    model: Referral,
                    attributes: []
                },
                {
                    model: Document,
                    attributes: []
                },
            ],
            where: {
                '$documents.id$': documentId ? documentId : null,
            },
            group: ['Patient.id'],
            having: literal(`COUNT(Referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
        }) : await Patient.findAll({
            include: [
                {
                    model: Referral,
                    attributes: []
                },
            ],
            group: ['Patient.id'],
            having: literal(`COUNT(Referrals.id) BETWEEN ${fromCount} AND ${toCount}`),
        });

        if (patients.length > 0) {
            let workSheet = new exceljs.Workbook()
            const sheet = workSheet.addWorksheet("patients")
            sheet.columns = [
                { header: "شماره بیمار", key: 'patientCode', width: 12, },
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

    }
};

module.exports = reportController;
