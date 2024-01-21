const Referral = require("../models/referral.js");
const Patient  = require('../models/patient.js')

const referralController = {
    createReferral: async (req, res, next) => {
        try {
            const {patientId, referralDate, referralReason, description} = req.body;
            const isExistPatient = await Patient.findOne({where: {id: patientId}})
            if(!isExistPatient) {
                return res.status(400).json({
                    message: "بیمار یافت نشد"
                })
            } else {
                const newReferral = await Referral.create({
                    patientId,
                    referralDate,
                    referralReason,
                    description
    
                })
                return res.status(201).json(newReferral)    
            }
        } catch (error) {
            console.log(error)
        }
    },
    
    getAllReferral: async (req, res, next) => {
        try {
            const referrals = await Referral.findAll({include: Patient})
            return res.status(200).json(referrals)    
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = referralController