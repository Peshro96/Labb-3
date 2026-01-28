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

// GET alla författare
app.get('/authors', (req, res) => {
    const sql = 'SELECT * FROM authors';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// GET författare baserat på id
app.get('/authors/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM authors WHERE id = ?';

    db.query(sql, [id], (err, results) => {       
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        res.json(results[0]);
    });
});

// POST - Skapa ny författare
app.post('/authors', (req, res) => {
    const { name, birth_year, nationality } = req.body;
    const sql = 'INSERT INTO authors (name, birth_year, nationality) VALUES (?, ?, ?)';

    db.query(sql, [name, birth_year, nationality], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Author created successfully',
            id: result.insertId 
        });
    });
});

// PUT - Uppdatera författare 
app.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const { name, birth_year, nationality } = req.body;
    const sql = 'UPDATE authors SET name = ?, birth_year = ?, nationality = ? WHERE id = ?';

    db.query(sql, [name, birth_year, nationality, id], (err, result) => {  
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        res.status(200).json({  
            message: 'Author updated successfully',
            id: id  
        });
    });
});

// DELETE - Borttagning av en författare
app.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM authors WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        res.status(200).json({  
            message: 'Author deleted successfully',
            id: id  
        });
    });
});

// Startar servern
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});