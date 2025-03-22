const { Electronics } = require('../index');

const electronicsSeeds = async () => {
    try {
        // Clear existing electronics
        await Electronics.destroy({ where: {} });

        // Create sample electronics
        const electronics = [
            {
                name: 'PlayStation 5',
                release: '2020-11-12',
                quantity: 30,
                price: 499.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 95,
                description: 'Next-gen gaming console with stunning graphics and fast loading times.' 
                // image : "https://variety.com/wp-content/uploads/2024/09/PS5-Pro-Featured.jpg?w=1000&h=563&crop=1"
            },
            {
                name: 'Xbox Series X',
                release: '2020-11-10',
                quantity: 25,
                price: 499.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 94,
                description: 'Powerful gaming console with Game Pass subscription service.'
            },
            {
                name: 'Nintendo Switch OLED',
                release: '2021-10-08',
                quantity: 40,
                price: 349.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 92,
                description: 'Portable gaming console with enhanced OLED display.'
            },
            {
                name: 'Gaming Headset Pro',
                release: '2023-01-15',
                quantity: 100,
                price: 129.99,
                category: ['Accessories', 'Audio'],
                rating: 88,
                description: 'High-quality gaming headset with surround sound and noise cancellation.'
            },
            {
                name: 'Gaming Mouse RGB',
                release: '2023-03-20',
                quantity: 150,
                price: 79.99,
                category: ['Accessories', 'Peripherals'],
                rating: 90,
                description: 'Precision gaming mouse with customizable RGB lighting.'
            }
        ];

        await Electronics.bulkCreate(electronics);
        console.log('Electronics seeds completed successfully');
    } catch (error) {
        console.error('Error seeding electronics:', error);
    }
};

module.exports = electronicsSeeds; 