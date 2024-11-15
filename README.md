# Contact Management CRM System

This project is a contact management feature for a Customer Relationship Management (CRM) system. It allows users to perform CRUD (Create, Read, Update, Delete) operations on contacts. The app is built with a **ReactJS** frontend and a **Node.js/Express** backend, with **MySQL** as the database and **Sequelize** for ORM.

## Features

- CRUD operations on contacts
- Form validation using **Formik** and **Yup** in the frontend
- **Material UI** for responsive UI components
- RESTful API built with **Express.js**
- **MySQL** database managed using **Sequelize ORM**
- Error handling on both frontend and backend

## Tech Stack

### Frontend:
- **ReactJS**
- **Material UI**
- **Formik** and **Yup** (for form handling and validation)
- **Axios** (for making API requests)

### Backend:
- **Node.js**
- **Express.js**
- **Sequelize** (ORM)
- **MySQL** (Database)

## Setup Instructions

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js** and **npm** installed on your machine
- **MySQL** database running locally or remotely

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/contact-management-crm.git
cd contact-management-crm
```

### 2. Backend Setup

1. Navigate to the 'backend' folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the 'backend' directory and add the following environment variables:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=contacts_db
   ```

4. Create your MySQL database. If you're using a MySQL client, run the following script to create the `contacts_db` database:

   ```sql
   CREATE DATABASE contacts_db;
   ```

5. Set up your database schema by running the Sequelize migration:

   ```bash
   npx sequelize db:migrate
   ```

   This will create the `Contacts` table based on the Sequelize model in `contactModel.js`.

6. Start the backend server:

   ```bash
   npm start
   ```

   The backend API will be running at `http://localhost:5000`.

### 3. Database Schema

If you prefer to manually set up the database, you can use this SQL script:

```sql
CREATE TABLE Contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15),
    company VARCHAR(100),
    jobTitle VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. Frontend Setup

1. Navigate to the 'frontend' folder:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

   The React app will be running at `http://localhost:3000`.

### 5. Accessing the Application

Once both the backend and frontend servers are running, open your browser and go to `http://localhost:3000`. You should be able to perform all CRUD operations (Add, Edit, View, Delete contacts).

## How Each Part of the App Works

### Frontend

- **React Components**: The app uses a component-based structure with **Material UI** for responsive design. Components like `ContactForm.js` and `ContactsTable.js` are used for form handling and displaying contact data.
- **Formik** and **Yup**: These libraries handle form validation and provide easy integration with **Material UI** forms.
- **Axios**: Used to make HTTP requests to the backend API for fetching, adding, updating, and deleting contacts.

### Backend

- **Express.js**: The backend is built using Express, which serves as the REST API to handle requests from the frontend.
- **Sequelize ORM**: Sequelize is used to manage the **MySQL** database, simplifying CRUD operations and database schema management.
- **Error Handling**: Errors are managed using a custom middleware (`errorHandler.js`), which catches and formats any errors for a clean API response.

## API Endpoints

- `GET /contacts` - Fetch all contacts
- `POST /contacts` - Add a new contact
- `PUT /contacts/:id` - Update a contact by ID
- `DELETE /contacts/:id` - Delete a contact by ID

## Major Technical Decisions

1. **Formik and Yup for Forms**: Formik simplifies form handling, and Yup ensures form validation is robust and declarative.
2. **Sequelize ORM**: Using Sequelize abstracts the database interactions and makes it easier to manage migrations and models.
3. **Separation of Concerns**: The project is structured in a way that separates the concerns of different parts of the application (e.g., components, services, controllers).

