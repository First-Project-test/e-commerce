const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize(
    "store",
    "root",
    "root",     
    {
        host: "localhost",
        dialect: "mysql"
    }
);

// Test the connection
const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

testConnection();

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

// connection.sync({ force: true });
// console.log('All models were synchronized successfully.');

module.exports = { connection, DataTypes, User, Game, Electronics };