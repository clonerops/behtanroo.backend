const Referral = require("../models/referral.js");
const Patient  = require('../models/patient.js');
const { Op } = require("sequelize");

const referralController = {
    createReferral: async (req, res, next) => {
        try {
            const {patientId, documentId, referralDate, referralReason, description} = req.body;
            const isExistPatient = await Patient.findOne({where: { id: patientId }})
            if(!isExistPatient) {
                return res.status(400).json({
                    message: "بیمار یافت نشد"
                })
            } else {
                const newReferral = await Referral.create({
                    patientId,
                    documentId,
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
            const referrals = await Referral.findAll()
            return res.status(200).json(referrals)    
        } catch (error) {
            console.log(error)
        }
    },
    getAllReferralByDocumentAndPatient: async (req, res, next) => {
        try {
            const referrals = await Referral.findAll({
                where: {
                [Op.and]: [
                    { patientId: req.params.patientId },
                    { documentId: req.params.documentId }
                ]
            }})
            return res.status(200).json(referrals)    
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = referralController