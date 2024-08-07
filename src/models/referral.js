const { DataTypes } =  require('sequelize')
const sequelize =  require('../database/connection');

const Referral = sequelize.define("referral",{
    referralDate: {
        type: DataTypes.DATE
    },
    referralReason: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

module.exports = Referral

