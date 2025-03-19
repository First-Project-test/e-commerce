const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME || "store",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",     
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
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
const Category = require('./category')(connection, DataTypes);
const Cart = require('./cart')(connection, DataTypes);
const GameCategory = require('./gameCategory')(connection, DataTypes);

// Set up relationships
User.hasMany(Electronics);
Electronics.belongsTo(User);

User.hasMany(Game);
Game.belongsTo(User);

Electronics.hasMany(Game);
Game.belongsTo(Electronics);

// Category relationships
Category.hasMany(Electronics, {
    foreignKey: 'CategoryId'
});
Electronics.belongsTo(Category, {
    foreignKey: 'CategoryId'
});

// Game Category relationships
GameCategory.hasMany(Game, {
    foreignKey: 'GameCategoryId'
});
Game.belongsTo(GameCategory, {
    foreignKey: 'GameCategoryId'
});

// Cart relationships
User.hasMany(Cart);
Cart.belongsTo(User);

Electronics.hasMany(Cart);
Cart.belongsTo(Electronics);

Game.hasMany(Cart);
Cart.belongsTo(Game);

// Sync database
// connection.sync({ force: true });
// console.log('All models were synchronized successfully.');

module.exports = { 
    connection, 
    DataTypes, 
    User, 
    Game, 
    Electronics, 
    Category, 
    Cart, 
    GameCategory 
};