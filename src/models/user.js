const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection')

const User = sequelize.define("User",{
    firstName: {
        type: DataTypes.STRING
    },

    lastName: {
        type: DataTypes.STRING
    },

    userName: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING
    },

    mobile: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING,
    },
})

module.exports = User