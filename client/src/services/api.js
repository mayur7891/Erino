import axios from 'axios';
import { CONTACTS_API } from '../constants';

export const getContacts = async () => {
    try {
        const response = await axios.get(CONTACTS_API);
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

export const addContact = async (contact) => {
    try {
        const response = await axios.post(CONTACTS_API, contact);
        return response.data;
    } catch (error) {
        console.error('Error adding contact:', error);
        throw error;
    }
};

export const updateContact = async (id, updatedContact) => {
    try {
        const response = await axios.put(`${CONTACTS_API}/${id}`, updatedContact);
        return response.data;
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};

export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${CONTACTS_API}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};
