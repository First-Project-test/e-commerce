module.exports = (connection, DataTypes) => {
    const User = connection.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cart: {
            type: DataTypes.JSON,
            allowNull: true
        }
    });

    return User;
};