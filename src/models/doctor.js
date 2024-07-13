
const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');
const PatientDocument = require('./patient_document');


const Doctor = sequelize.define("doctor",{
    firstName: {
        type: DataTypes.STRING
    },

    lastName: {
        type: DataTypes.STRING
    },

    mobile: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

Doctor.hasMany(PatientDocument, {onDelete: 'cascade'});
PatientDocument.belongsTo(Doctor, { onDelete: 'cascade'}); 

module.exports = Doctor