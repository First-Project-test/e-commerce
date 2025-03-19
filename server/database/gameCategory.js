module.exports = (connection, DataTypes) => {
    const GameCategory = connection.define('GameCategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return GameCategory;
}; 