const Patient = require ("../models/patient.js");
const Referral = require("../models/referral.js");

const patientController = {
    createPatient: async (req, res, next) => {
        try {
            const { firstName, lastName, nationalCode, mobile, mobile2, tel, address } = req.body;
            const isExist = await Patient.findOne({where: {nationalCode: nationalCode}})
            if(isExist) {
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
                    patientCode: Math.floor(Math.random()*1000000)
                })

                return res.status(200).json(patient);
            }
        } catch (error) {
            return error
        }
    },

    getAllPatients: async (req, res, next) => {
        try {

            const patients = await Patient.findAll({include: {model: Referral}})
            return res.status(200).json( patients )
            
        } catch (error) {
            console.log(error)
        }
    },
    
    getPatientsById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({ where: { id: req.params.id } })
            return res.status(200).json( patient )

        } catch (error) {
            console.log(error)
        }
    },

    getPatientReferralById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({ where: { id: req.params.id }, include: Referral })
            return res.status(200).json( patient )

        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = patientController