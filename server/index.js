require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const contactsRouter = require('./routes/contacts');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(bodyParser.json());

app.use('/contacts', contactsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
