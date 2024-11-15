import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: '#1976d2' }} 
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#fff' }}
                >
                    Contact Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
