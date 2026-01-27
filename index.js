// Importerar paket 
const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

// Skapar databasanslutning
const db = mysql.createConnection({
    host: process.env.DB_HOST,          
    user: process.env.DB_USER,          
    password: process.env.DB_PASSWORD,   
    database: process.env.DB_NAME
});

// Testar anslutningen
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Skapar app
const app = express();

// Middleware
app.use(express.json());

// Port från .env
const PORT = process.env.PORT || 3000;

// Startar servern
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});