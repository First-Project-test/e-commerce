module.exports = (connection, DataTypes) => {
    const Orders = connection.define('Orders', {
       
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        items:{
            type: DataTypes.Text
        }
    }, {
        timestamps: true
    });

    return Orders;
};