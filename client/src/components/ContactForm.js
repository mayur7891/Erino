import React from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField, DialogActions, Button } from '@mui/material';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    firstName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'First Name must contain only letters and spaces')
        .min(2, 'First Name must be at least 2 characters')
        .max(50, 'First Name cannot exceed 50 characters')
        .required('First Name is required'),

    lastName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Last Name must contain only letters and spaces')
        .min(2, 'Last Name must be at least 2 characters')
        .max(50, 'Last Name cannot exceed 50 characters')
        .required('Last Name is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .matches(/^[789]\d{9}$/, 'Phone Number must be 10 digits and start with 7, 8, or 9')
        .required('Phone Number is required'),

    company: Yup.string()
        .max(100, 'Company name cannot exceed 100 characters')
        .required('Company Name is required'),

    jobTitle: Yup.string()
        .max(100, 'Job Title cannot exceed 100 characters')
        .required('Job Title is required'),
});

const ContactForm = ({ editContact, handleSaveContact, handleCloseDialog }) => {
    return (
        <Formik
            initialValues={editContact || {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveContact}
        >
            {({ errors, touched }) => (
                <Form>
                    
                    <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        fullWidth
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

                    <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

                   
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

         
                    <Field
                        as={TextField}
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

           
                    <Field
                        as={TextField}
                        name="company"
                        label="Company"
                        fullWidth
                        error={touched.company && Boolean(errors.company)}
                        helperText={touched.company && errors.company}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

               
                    <Field
                        as={TextField}
                        name="jobTitle"
                        label="Job Title"
                        fullWidth
                        error={touched.jobTitle && Boolean(errors.jobTitle)}
                        helperText={touched.jobTitle && errors.jobTitle}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
