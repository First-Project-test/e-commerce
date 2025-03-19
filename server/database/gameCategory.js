module.exports = (connection, DataTypes) => {
    const GameCategory = connection.define('GameCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true
    });

    return GameCategory;
}; 