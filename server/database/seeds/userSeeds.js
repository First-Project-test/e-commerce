const bcrypt = require('bcrypt');
const { User } = require('../index');

const userSeeds = async () => {
    try {
        // Clear existing users
        await User.destroy({ where: {} });

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'admin',
            cart: []
        });

        // Create regular users
        const userPassword = await bcrypt.hash('user123', 10);
        const users = [
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: userPassword,
                role: 'user',
                cart: []
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                password: userPassword,
                role: 'user',
                cart: []
            },
            {
                username: 'mike_wilson',
                email: 'mike@example.com',
                password: userPassword,
                role: 'user',
                cart: []
            }
        ];

        await User.bulkCreate(users);
        console.log('User seeds completed successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = userSeeds;