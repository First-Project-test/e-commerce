module.exports = (connection, DataTypes) => {
    const Orders = connection.define('Orders', {
       
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        items:{
            type: DataTypes.JSON,
        }
    }, {
        timestamps: true
    });

    return Orders;
};