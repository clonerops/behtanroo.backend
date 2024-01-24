
const { DataTypes } =  require('sequelize')
const Referral =  require('./referral')
const sequelize =  require('../database/connection')


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

    Address: {
        type: DataTypes.STRING
    },

    patientCode: {
        type: DataTypes.INTEGER,
    },
})

Patient.hasMany(Referral)

module.exports = Patient