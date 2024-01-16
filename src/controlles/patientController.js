import Patient from "../models/patient";

const patientController = {
    createPatient: async (req, res, next) => {
        try {
            const { firstName, lastName, nationalCode, mobile, mobile2, tel, address } = req.body;

            let newPatient = new Patient({
                firstName,
                lastName,
                mobile,
                nationalCode,
                mobile2,
                tel,
                address,
                patientCode: Math.floor(Math.random()*1000000)
            })

            const findPatient = await Patient.findOne({
                nationalCode: nationalCode
            })

            if(findPatient) {
                return res.status(400).json({
                    message: "بیماری با این کدملی قبلا در سامانه ثبت شده است",
                    succeseded: false
                })

            
            } else {
                await newPatient.save()
                return res.status(200).json(newPatient);
            }

        } catch (error) {
            return error
        }
    },

    getAllPatients: async (req, res, next) => {
        try {

            const patients = await Patient.find()
            return res.status(200).json( patients )
            
        } catch (error) {
            console.log(error)
        }
    },
    
    getPatientsById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({_id: req.params.id})
            return res.status(200).json( patient )

        } catch (error) {
            console.log(error)
        }
    },

    getPatientReferralById: async (req, res, next) => {
        try {
            const patient = await Patient.findOne({_id: req.params.id}).populate("referral")
            return res.status(200).json( patient )

        } catch (error) {
            console.log(error)
        }
    },
}

export default patientController