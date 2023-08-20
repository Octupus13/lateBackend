// app.js
const express = require('express');
const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: 'database-2.ctilcla9chru.us-east-1.rds.amazonaws.com',
  user: 'admin',
  port: 3306,
  password: 'NKM12345',
  database: 'Pinterblue'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to database.');
  }
});

app.get('/', (req, res) => {
  const query = 'SELECT URL, TITLE, CONTENT FROM images';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Error fetching data from the database.' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
