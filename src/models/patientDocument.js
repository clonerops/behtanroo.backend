const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');
const Patient = require('./patient');
const Document = require('./document');

const PatientDocument = sequelize.define("patientDocument",{
    documentId: {
        type: DataTypes.STRING
    },
    patientId: {
        type: DataTypes.STRING
    }
})

Patient.belongsToMany(Document, { through: PatientDocument, foreignKey: 'patientId' });
Document.belongsToMany(Patient, { through: PatientDocument, foreignKey: 'documentId' });

module.exports = PatientDocument

