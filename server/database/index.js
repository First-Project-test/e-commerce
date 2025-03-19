const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME || "store",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",     
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false // Disable logging
    }
);

// Import and initialize models
const User = require('./user')(connection, DataTypes);
const Game = require('./game')(connection, DataTypes);
const Electronics = require('./electronics')(connection, DataTypes);

// Set up relationships
User.hasMany(Electronics);
Electronics.belongsTo(User);

User.hasMany(Game);
Game.belongsTo(User);

Electronics.hasMany(Game);
Game.belongsTo(Electronics);

// Test connection and sync models
connection.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        return connection.sync({ force: true });
    })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    });

module.exports = { connection, DataTypes, User, Game, Electronics };


