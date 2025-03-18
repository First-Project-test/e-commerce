module.exports = (connection, DataTypes) => {
    const Game = connection.define('Game', {
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
        category: {
            type: DataTypes.JSON,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Game;
};