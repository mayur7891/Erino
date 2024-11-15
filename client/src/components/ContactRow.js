import React from 'react';
import PropTypes from 'prop-types'; 
import { TableRow, TableCell, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ContactRow({ contact, onEdit, onDelete }) {
    return (
        <TableRow hover>
            <TableCell>{contact.firstName}</TableCell>
            <TableCell>{contact.lastName}</TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.phoneNumber}</TableCell>
            <TableCell>{contact.company}</TableCell>
            <TableCell>{contact.jobTitle}</TableCell>

            <TableCell align="left">
                <IconButton color="primary" onClick={() => onEdit(contact)}>
                    <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(contact.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

ContactRow.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        company: PropTypes.string,
        jobTitle: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactRow;
