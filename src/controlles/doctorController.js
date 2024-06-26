const Doctor = require("../models/doctor.js");

const doctorController = {
    createDoctor: async (req, res, next) => {
        try {
            const { 
                firstName, 
                lastName, 
                mobile, 
                description } = req.body;
            const isExist = await Doctor.findOne({ where: { mobile: mobile } })
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
    // editPatient: async (req, res, next) => {
    //     try {
    //         const { 
    //             id, 
    //             firstName, 
    //             lastName, 
    //             nationalCode, 
    //             mobile, 
    //             mobile2, 
    //             tel, 
    //             address, 
    //             gender,
    //             birthDate,
    //             job,
    //             education,
    //             representative,
    //             maritalStatus, 
    //             description
    //          } = req.body;
    //         const findPatient = await Patient.findOne({ where: { mobile: mobile } })

    //        await findPatient.update({
    //             firstName, 
    //             lastName, 
    //             nationalCode, 
    //             mobile, 
    //             mobile2, 
    //             tel, 
    //             address, 
    //             gender,
    //             birthDate,
    //             job,
    //             education,
    //             representative,
    //             maritalStatus, 
    //             description
    //         })
    //         return res.status(200).json({message: true})
    //     } catch (error) {
    //         return error
    //     }
    // },

    getAllDoctors: async (req, res, next) => {
        try {

            const doctors = await Doctor.findAll()
            return res.status(200).json(doctors)
        } catch (error) {
            console.log(error)
        }
    },

    deleteDoctor: async (req, res, next) => {
        try {

            await Doctor.destroy({
                where: {
                    id: req.params.id,
                }
            });

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



