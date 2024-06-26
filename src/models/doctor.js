
const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');


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

})

module.exports = Doctor