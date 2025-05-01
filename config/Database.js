const mysql = require('mysql2')
const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: 'mysql'
    }
);


module.exports = sequelize;