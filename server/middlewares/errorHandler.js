const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);  


    res.status(500).json({
        error: 'Internal Server Error',
        details: err.message || 'An unexpected error occurred.'
    });
};

module.exports = errorHandler;
