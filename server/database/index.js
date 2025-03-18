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

connection.authenticate()
.then(console.log("connected"))
.catch(console.log("failed to connect"))

// connection.sync()

module.exports=connection