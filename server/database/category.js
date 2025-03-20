module.exports = (connection, DataTypes) => {
    const Category = connection.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:true

        }
    });

    return Category;
}; 