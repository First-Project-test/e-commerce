module.exports = (connection, DataTypes) => {
    const Game = connection.define('Game', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 5
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:true
        },
        gamecat:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:true
        },
        
    });

    return Game;
};