const { DataTypes } = require("sequelize");
const sequelize = require('../database/connection');
const Patient = require("./patient");
const Document = require("./document");

const Attachment = sequelize.define('attachment', {
    attachment: {
        type: DataTypes.TEXT('long'),
        default: '' // Corrected from default to defaultValue
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PatientDocuments',
            key: 'patientId'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PatientDocuments',
            key: 'documentId'
        }
    }

});



module.exports = Attachment;
