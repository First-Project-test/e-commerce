const { json } = require("sequelize");

module.exports = (connection, DataTypes) => {
    const Accessories = connection.define('Accessories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        release: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:true
        },
        role:{
            type:DataTypes.STRING,
            defaultValue:"accessorie",
        }
    });

    return Accessories;
};