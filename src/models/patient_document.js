const { DataTypes } = require("sequelize");
const Patient = require("./patient");
const Document = require("./document");
const sequelize =  require('../database/connection');
const Attachment = require("./attachment");

const PatientDocument = sequelize.define('PatientDocument', {
    description: {
        type: DataTypes.STRING
    },
    documentCode: {
        type: DataTypes.INTEGER,
    },

}, {
    hooks: {
        beforeCreate: async (patientDocument, options) => {
            try {
                const maxCode = await PatientDocument.max('documentCode', {
                    where: { documentId: patientDocument.documentId }
                });

                const nextCode = maxCode ? maxCode + 1 : 1001;
                patientDocument.documentCode = nextCode;
            } catch (error) {
                console.error(error);
                throw new Error('Error generating documentCode');
            }
        }
    }
});

// Patient.belongsToMany(Document, { through: PatientDocument });
// Document.belongsToMany(Patient, { through: PatientDocument });
// PatientDocument.belongsTo(Patient)
// PatientDocument.belongsTo(Document)
// Patient.belongsToMany(Attachment, { through: PatientDocument })
// Document.belongsToMany(Attachment, { through: PatientDocument })

PatientDocument.belongsTo(Patient);
PatientDocument.belongsTo(Document);
PatientDocument.belongsTo(Attachment);
Patient.belongsToMany(Document, { through: PatientDocument });
Document.belongsToMany(Patient, { through: PatientDocument });
Patient.belongsToMany(Attachment, { through: PatientDocument });
Document.belongsToMany(Attachment, { through: PatientDocument });

module.exports = PatientDocument