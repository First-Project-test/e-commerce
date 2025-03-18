const mysql=require('mysql2')
const {Sequelize,DataTypes}=require('sequelize')

const connection =new Sequelize (
    "store",
    "root",
    "root",     
    {
        host:"localhost",
        dialect:"mysql"
    }
)

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


connection.sync({ force: true });
console.log('All models were synchronized successfully.');

module.exports=connection