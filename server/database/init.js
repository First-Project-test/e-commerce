const mysql = require('mysql2/promise');
require('dotenv').config();

const initializeDatabase = async () => {
    try {
        // Create connection to MySQL server
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'root'
        });

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'store'}`);
        console.log('Database created or already exists');

        // Close the connection
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

// Run the initialization
initializeDatabase(); 