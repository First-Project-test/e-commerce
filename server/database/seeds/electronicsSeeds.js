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
                description: 'Precision gaming mouse with customizable RGB lighting.',
                image:["https://ichef.bbci.co.uk/news/1024/cpsprodpb/f310/live/f36de0e0-6f86-11ef-b410-fbf02dca0fc5.png.webp","https://i5.walmartimages.com/seo/Sony-PlayStation-5-PS5-Gaming-Console-Disc-Version_a53802d8-7632-4530-8fc5-84b129845ee8.0a980f45d3e696c9661a6d23bcc0edc2.jpeg"]
            }
        ];

        await Electronics.bulkCreate(electronics);
        console.log('Electronics seeds completed successfully');
    } catch (error) {
        console.error('Error seeding electronics:', error);
    }
};

module.exports = electronicsSeeds; 