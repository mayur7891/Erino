
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME,process.env.PASSWORD , {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 
});

module.exports = sequelize;
