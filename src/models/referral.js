const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection')

const Referral = sequelize.define("Referral",{
    referralDate: {
        type: DataTypes.DATE
    },
    referralReason: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
})

module.exports = Referral