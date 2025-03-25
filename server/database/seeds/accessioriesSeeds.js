const { Accessories, Category } = require('../index');

const accessoriesSeeds = async () => {
  try {
    await Accessories.destroy({ where: {} });

    const accessories = [
      {
        name: 'Gaming Headset Pro',
        release: '2023-01-15',
        quantity: 100,
        price: 129.99,
        rating: 4.8,
        description: 'High-quality gaming headset with surround sound and noise cancellation.',
        image: ['https://m.media-amazon.com/images/I/71ntFy8cKGL._AC_SL1500_.jpg'],
      },
      {
        name: 'RGB Gaming Mouse',
        release: '2023-03-20',
        quantity: 150,
        price: 79.99,
        rating: 4.7,
        description: 'Precision gaming mouse with customizable RGB lighting.',
        image: ['https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg'],
      },
      {
        name: 'Mechanical Gaming Keyboard',
        release: '2023-02-10',
        quantity: 120,
        price: 99.99,
        rating: 4.9,
        description: 'Durable mechanical keyboard with customizable RGB lighting.',
        image: ['https://m.media-amazon.com/images/I/71c5lQeI1EL._AC_SL1500_.jpg'],
      },
      {
        name: 'External SSD 1TB',
        release: '2022-11-05',
        quantity: 200,
        price: 149.99,
        rating: 4.6,
        description: 'High-speed external SSD with 1TB storage capacity.',
        image: ['https://m.media-amazon.com/images/I/61U7T1koQqL._AC_SL1500_.jpg'],
      },
      {
        name: 'Gaming Chair Deluxe',
        release: '2023-04-01',
        quantity: 50,
        price: 299.99,
        rating: 4.8,
        description: 'Ergonomic gaming chair with adjustable features and RGB lighting.',
        image: ['https://m.media-amazon.com/images/I/71s9FMk+FvL._AC_SL1500_.jpg'],
      },
      {
        name: 'Streaming Microphone',
        release: '2023-05-15',
        quantity: 80,
        price: 99.99,
        rating: 4.7,
        description: 'Professional-grade microphone for streaming and recording.',
        image: ['https://m.media-amazon.com/images/I/71fJxk9bKOL._AC_SL1500_.jpg'],
      },
      {
        name: 'Gaming Monitor 27"',
        release: '2023-06-10',
        quantity: 60,
        price: 399.99,
        rating: 4.9,
        description: '27-inch gaming monitor with 144Hz refresh rate and 1ms response time.',
        image: ['https://m.media-amazon.com/images/I/81v90JtbImL._AC_SL1500_.jpg'],
      },
      {
        name: 'Portable Hard Drive 2TB',
        release: '2023-07-20',
        quantity: 100,
        price: 89.99,
        rating: 4.5,
        description: 'Portable hard drive with 2TB storage capacity for gaming and backups.',
        image: ['https://m.media-amazon.com/images/I/71t5Jw8eAQL._AC_SL1500_.jpg'],
      },
    ];

    await Accessories.bulkCreate(accessories);
    console.log('Accessories seeds completed successfully');
  } catch (error) {
    console.error('Error seeding accessories:', error);
  }
};

module.exports = accessoriesSeeds;