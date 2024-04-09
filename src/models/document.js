const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');
const Referral = require('./referral');
const Attachment = require('./attachment');

const Document = sequelize.define("document",{
    title: {
        type: DataTypes.STRING
    }
})

Document.hasMany(Referral)
// Document.hasMany(Attachment)


module.exports = Document

