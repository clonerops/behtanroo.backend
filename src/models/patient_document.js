const { DataTypes } = require("sequelize");
const Patient = require("./patient");
const Document = require("./document");
const sequelize =  require('../database/connection');

const PatientDocument = sequelize.define('PatientDocument', {
    description: {
        type: DataTypes.STRING
    }
});

Patient.belongsToMany(Document, { through: PatientDocument });
Document.belongsToMany(Patient, { through: PatientDocument });

module.exports = PatientDocument