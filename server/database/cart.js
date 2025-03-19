module.exports = (connection, DataTypes) => {
    const Cart = connection.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        GameId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Games',
                key: 'id'
            }
        },
        ElectronicsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Electronics',
                key: 'id'
            }
        },
        itemType: {
            type: DataTypes.ENUM('game', 'electronics'),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return Cart;
}; 