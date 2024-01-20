const Referral = require("../models/referral.js");
const Patient  = require('../models/patient.js')

const referralController = {
    createReferral: async (req, res, next) => {
        try {
            const {patient, referralDate, referralReason, description} = req.body;

            const referral = new Referral({
                patient,
                referralDate,
                referralReason,
                description
            })

            const findPatient = await Patient.findOne({_id: patient})
            if(!findPatient) {
                return res.status(400).json({
                    message: "بیمار یافت نشد"
                })
            } else {
                findPatient.referral.push(referral._id)
                await referral.save()
                await findPatient.save(); 
                return res.status(201).json(referral)    
            }
    
        } catch (error) {
            console.log(error)
        }
    },
    
    getAllReferral: async (req, res, next) => {
        try {
            const referrals = await Referral.find().populate("patient")
            return res.status(200).json(referrals)    
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = referralController