const Patient = require("../models/patient.js");
const Referral = require("../models/referral.js");
const exceljs = require('exceljs')

const patientController = {
    createPatient: async (req, res, next) => {
        try {
            const { firstName, lastName, nationalCode, mobile, mobile2, tel, address, gender, description } = req.body;
            const isExist = await Patient.findOne({ where: { nationalCode: nationalCode } })
            if (isExist) {
                return res.status(400).json({
                    message: "بیماری با این کدملی قبلا در سامانه ثبت شده است",
                    succeseded: false
                })
            } else {
                const patient = await Patient.create({
                    firstName,
                    lastName,
                    mobile,
                    nationalCode,
                    mobile2,
                    tel,
                    address,
                    gender,
                    description,
                    patientCode: Math.floor(Math.random() * 1000000)
                })

                return res.status(200).json(patient);
            }
        } catch (error) {
            return error
        }
    },

    getAllPatients: async (req, res, next) => {
        try {

            const patients = await Patient.findAll({ include: { model: Referral } })
            return res.status(200).json(patients)

        } catch (error) {
            console.log(error)
        }
    },

    getPatientsById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({ where: { id: req.params.id } })
            return res.status(200).json(patient)

        } catch (error) {
            console.log(error)
        }
    },

    getPatientReferralById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({ where: { id: req.params.id }, include: Referral })
            return res.status(200).json(patient)

        } catch (error) {
            console.log(error)
        }
    },

    exportExcelPatientList: async (req, res, next) => {
        try {

            const patients = await Patient.findAll()
            let workSheet = new exceljs.Workbook()
            const sheet = workSheet.addWorksheet("patients")
            sheet.columns = [
                {header: "شماره بیمار", key: 'patientCode', width: 12, },
                {header: "نام", key: 'firstName', width: 16},
                {header: "نام خانوادگی", key: 'lastName', width: 18},
                {header: "کدملی", key: 'nationalCode', width: 16},
                {header: "تلفن همراه", key: 'mobile', width: 16},
                {header: "تلفن همراه ضروری", key: 'mobile2', width: 16},
                {header: "تلفن منزل", key: 'tel', width: 16},
                {header: "جنسیت", key: 'gender', width: 4},
                {header: "آدرس", key: 'address', width: 16},
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

            // workSheet.xlsx.write(res)
            const buffer = await workSheet.xlsx.writeBuffer();
            res.send(buffer);

        } catch (error) {
            console.log(error)
        }
    },


}

module.exports = patientController



