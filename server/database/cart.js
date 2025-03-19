module.exports = (connection, DataTypes) => {
    const Cart = connection.define('Cart', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        itemType: {
            type: DataTypes.ENUM('electronics', 'game'),
            allowNull: false
        }
    });

    return Cart;
}; 