const {Sequelize,DataTypes}=require('sequelize')
const connection=require('./index')

const user= connection.define('user',{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false

    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cart:{
        type:DataTypes.JSON,
        allowNull:true
    }
})
module.exports=user