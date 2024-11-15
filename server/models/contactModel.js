
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Contact = db.define('Contact', {
   
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true, 
});


Contact.sync();

module.exports = Contact;
