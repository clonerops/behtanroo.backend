
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("behdb", "root", "aBo217767345", {
    dialect: "mysql",
    host: "localhost",
    logging: false
})

module.exports = sequelize 