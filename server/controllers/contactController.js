const Contact = require('../models/contactModel');
const { Op } = require('sequelize');


const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        next(error); 
    }
};


const createContact = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(firstName)) {
        return res.status(400).json({ error: 'Invalid first name. Only alphabets and spaces allowed.' });
    }
    if (!namePattern.test(lastName)) {
        return res.status(400).json({ error: 'Invalid last name. Only alphabets and spaces allowed.' });
    }

    try {
  
        const existingContact = await Contact.findOne({
            where: {
                [Op.or]: [{ email }, { phoneNumber }]
            }
        });

        if (existingContact) {
            return res.status(400).json({ error: 'A contact with the same email or phone number already exists.' });
        }

        const contact = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            company,
            jobTitle,
        });

        res.status(201).json(contact);
    } catch (error) {
        console.error('Error creating contact:', error);
        next(error);
    }
};


const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    
    const namePattern = /^[A-Za-z\s]+$/;
    if (firstName && !namePattern.test(firstName)) {
        return res.status(400).json({ error: 'Invalid first name. Only alphabets and spaces allowed.' });
    }
    if (lastName && !namePattern.test(lastName)) {
        return res.status(400).json({ error: 'Invalid last name. Only alphabets and spaces allowed.' });
    }

    try {
        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

       
        const existingContact = await Contact.findOne({
            where: {
                [Op.or]: [{ email }, { phoneNumber }],
                [Op.not]: [{ id }]
            }
        });

        if (existingContact) {
            return res.status(400).json({ error: 'A contact with the same email or phone number already exists.' });
        }

        contact.firstName = firstName || contact.firstName;
        contact.lastName = lastName || contact.lastName;
        contact.email = email || contact.email;
        contact.phoneNumber = phoneNumber || contact.phoneNumber;
        contact.company = company || contact.company;
        contact.jobTitle = jobTitle || contact.jobTitle;

        await contact.save();
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error updating contact:', error);
        next(error);
    }
};


const deleteContact = async (req, res, next) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        await contact.destroy();
        res.status(204).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        next(error);
    }
};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};
