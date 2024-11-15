import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TableSortLabel, TablePagination, Alert } from '@mui/material';
import { getContacts, addContact, updateContact, deleteContact } from '../services/api';
import ContactRow from './ContactRow';
import ContactForm from './ContactForm';  

function ContactsTable() {
    const [contacts, setContacts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editContact, setEditContact] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteContactId, setDeleteContactId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('firstName');  
    const [alert, setAlert] = useState({ message: '', type: '' });  

    useEffect(() => {
        fetchContacts();
    }, [page, rowsPerPage, order, orderBy]);

    const fetchContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedContacts = contacts.sort((a, b) => {
        if (orderBy === 'firstName') {
            return order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
        }
        return 0;
    });

    const handleOpenDialog = (contact = null) => {
        if (contact) setEditContact(contact);
        else setEditContact(null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    

    const handleOpenDeleteDialog = (id) => {
        setDeleteContactId(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setDeleteContactId(null);
    };

    const handleSaveContact = async (values, { resetForm }) => {
        try {
            if (editContact) {
                await updateContact(editContact.id, values);
                setAlert({ message: 'Contact updated successfully!', type: 'success' });
            } else {
                await addContact(values);
                setAlert({ message: 'Contact added successfully!', type: 'success' });
            }
            fetchContacts();
            handleCloseDialog();
            resetForm();

            
            setTimeout(() => setAlert({ message: '', type: '' }), 3000);
        } catch (error) {
            console.error("Error saving contact:", error);
            setAlert({ message: 'Error saving contact!', type: 'error' });

            
            setTimeout(() => setAlert({ message: '', type: '' }), 3000);
        }
    };

    const handleConfirmDelete = async () => {
        if (deleteContactId) {
            try {
                await deleteContact(deleteContactId);
                setAlert({ message: 'Contact deleted successfully!', type: 'success' });
                fetchContacts();
                handleCloseDeleteDialog();

              
                setTimeout(() => setAlert({ message: '', type: '' }), 3000);
            } catch (error) {
                console.error("Error deleting contact:", error);
                setAlert({ message: 'Error deleting contact!', type: 'error' });

              
                setTimeout(() => setAlert({ message: '', type: '' }), 3000);
            }
        }
    };


    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
                style={{ marginTop: '20px', marginBottom: '20px' }}
            >
                Add New Contact
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'firstName'}
                                    direction={orderBy === 'firstName' ? order : 'asc'}
                                    onClick={() => handleRequestSort('firstName')}
                                >
                                    First Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedContacts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(contact => (
                                <ContactRow
                                    key={contact.id}
                                    contact={contact}
                                    onEdit={handleOpenDialog}
                                    onDelete={handleOpenDeleteDialog}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
                <DialogContent>
                    {alert.message && (
                        <Alert severity={alert.type} style={{ marginBottom: '20px' }}>
                            {alert.message}
                        </Alert>
                    )}
                    <ContactForm
                        editContact={editContact}
                        handleSaveContact={handleSaveContact}
                        handleCloseDialog={handleCloseDialog}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this contact?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ContactsTable;
