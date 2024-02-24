const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');

const Document = sequelize.define("document",{
    title: {
        type: DataTypes.STRING
    }
})

module.exports = Document

