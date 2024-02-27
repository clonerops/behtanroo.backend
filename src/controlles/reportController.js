const { Op } = require("sequelize");
const Patient = require("../models/patient");

const reportController = {
    patientListByFilter: async (req, res, next) => {
        try {
            const { documentId, fromDate, toDate } = req.params;

            const patients = await Patient.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [fromDate, toDate]
                    }
                }
            });
            res.json({ patients });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = reportController;
