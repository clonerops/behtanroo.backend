const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection');
const Referral = require('./referral');

const Document = sequelize.define("document", {
    title: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

Document.hasMany(Referral)
// Document.hasMany(Attachment)


module.exports = Document

