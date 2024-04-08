const { DataTypes } = require("sequelize");
const sequelize =  require('../database/connection');

const Attachment = sequelize.define('Attachment', {
    attachment: {
        type: DataTypes.TEXT('long'),
        default: ''
    },

});


module.exports = Attachment