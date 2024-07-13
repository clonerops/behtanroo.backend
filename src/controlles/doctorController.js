const Doctor = require("../models/doctor.js");

const doctorController = {
    createDoctor: async (req, res, next) => {
        try {
            const { 
                firstName, 
                lastName, 
                mobile, 
                description } = req.body;
            const isExist = await Doctor.findOne({ where: { mobile: mobile, isDeleted: false } })
            if (isExist) {
                return res.status(400).json({
                    message: "پزشک با این شماره همراه قبلا در سامانه ثبت شده است",
                    succeseded: false
                })
            } else {
                const doctor = await Doctor.create({
                    firstName,
                    lastName,
                    mobile,
                    description,
                })

                return res.status(200).json({
                    succeseded: true,
                    data: doctor
                });
            }
        } catch (error) {
            return error
        }
    },
    editDoctor: async (req, res, next) => {
        try {
            const {
                id, 
                firstName, 
                lastName, 
                mobile, 
                description} = req.body;
            const findDoctor = await Doctor.findOne({ where: { id: id, isDeleted: false } })

           await findDoctor.update({
                firstName, 
                lastName, 
                mobile, 
                description
            })
            return res.status(200).json({message: true})
        } catch (error) {
            return error
        }
    },

    getAllDoctors: async (req, res, next) => {
        try {

            const doctors = await Doctor.findAll({where: {isDeleted: false}})
            return res.status(200).json(doctors)
        } catch (error) {
            console.log(error)
        }
    },

    getDoctorById: async (req, res, next) => {
        try {
            const doctor = await Doctor.findOne({where: { id: req.params.id, isDeleted: false },})
            return res.status(200).json(doctor)

        } catch (error) {
            console.log(error)
        }
    },

    deleteDoctor: async (req, res, next) => {
        try {
            const doctor = await Doctor.findOne({where: { id: req.params.id, isDeleted: false },})
            await doctor.update({
                isDeleted: true
            })

            // await Doctor.destroy({
            //     where: {
            //         id: req.params.id,
            //     }
            // });

            return res.status(200).json({
                success: true,
                message: "پرشک با موفقیت حذف گردید"
            });


        } catch (error) {
            return res.status(500).json({ message: error })
        }

    },

}

module.exports = doctorController



