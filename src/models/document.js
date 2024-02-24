const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');
const Patient = require('./patient');

const Document = sequelize.define("document",{
    title: {
        type: DataTypes.STRING
    }
})
    
module.exports = Document

