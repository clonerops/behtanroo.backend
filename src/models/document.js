const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');
const Patient = require('./patient');
const Referral = require('./referral');

const Document = sequelize.define("document",{
    title: {
        type: DataTypes.STRING
    }
})

Document.hasMany(Referral)


module.exports = Document

