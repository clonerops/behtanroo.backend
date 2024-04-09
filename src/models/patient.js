
const { DataTypes } =  require('sequelize')
const Referral =  require('./referral')
const sequelize =  require('../database/connection');
const Document = require('./document');
const Attachment = require('./attachment');


const Patient = sequelize.define("patient",{
    firstName: {
        type: DataTypes.STRING
    },

    lastName: {
        type: DataTypes.STRING
    },

    nationalCode: {
        type: DataTypes.STRING
    },

    mobile: {
        type: DataTypes.STRING
    },

    mobile2: {
        type: DataTypes.STRING
    },

    tel: {
        type: DataTypes.STRING
    },

    address: {
        type: DataTypes.STRING
    },

    gender: {
        type: DataTypes.SMALLINT
    },

    birthDate: {
        type: DataTypes.STRING
    },

    job: {
        type: DataTypes.STRING
    },

    education: {
        type: DataTypes.STRING
    },

    representative: {
        type: DataTypes.STRING
    },

    maritalStatus: {
        type: DataTypes.SMALLINT
    },
    
    description: {
        type: DataTypes.TEXT
    },

    patientCode: {
        type: DataTypes.INTEGER,
    },

}, {
    hooks: {
        beforeCreate: (patient, options) => {
            return Patient.max('patientCode')
                .then(maxCode => {
                    const nextCode = maxCode ? maxCode + 1 : 100;
                    patient.patientCode = nextCode;
                });
        }
    }
})

Patient.hasMany(Referral)
// Patient.hasMany(Attachment)


module.exports = Patient