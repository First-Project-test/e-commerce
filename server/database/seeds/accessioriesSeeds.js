const { Accessories, Category } = require('../index');

const accessoriesSeeds = async () => {
  try {
    await Accessories.destroy({ where:{}})
    const accessories = [
      {
        name: 'Gaming Headset Pro',
        release: '2023-01-15',
        quantity: 100,
        price: 129.99,
        rating: 4.8,
        description: 'High-quality gaming headset with surround sound and noise cancellation.',
        image: ['https://softechtunisie.tn/2134-large_default/casque-gamer-logitech-g-pro-x-gaming-headset-noir.jpg'],
      },
      {
        name: 'RGB Gaming Mouse',
        release: '2023-03-20',
        quantity: 150,
        price: 79.99,
        rating: 4.7,
        description: 'Precision gaming mouse with customizable RGB lighting.',
        image: ['https://redragonshop.com/cdn/shop/products/8000DPIWiredOpticalGamerMouse_2.png?v=1678084040&width=713'],
      },
      {
        name: 'Mechanical Gaming Keyboard',
        release: '2023-02-10',
        quantity: 120,
        price: 99.99,
        rating: 4.9,
        description: 'Durable mechanical keyboard with customizable RGB lighting.',
        image: ['https://cdns3.thecosmicbyte.com/wp-content/uploads/Artimis-1.jpg'],
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
        image: ['https://images-na.ssl-images-amazon.com/images/I/91JaFSkJnuL._SS400_.jpg'],
      },
      {
        name: 'Streaming Microphone',
        release: '2023-05-15',
        quantity: 80,
        price: 99.99,
        rating: 4.7,
        description: 'Professional-grade microphone for streaming and recording.',
        image: ['https://technoholicnepal.com/wp-content/uploads/2023/10/61NrAZHeuCL-400x400.jpg'],
      },
      {
        name: 'Gaming Monitor 27"',
        release: '2023-06-10',
        quantity: 60,
        price: 399.99,
        rating: 4.9,
        description: '27-inch gaming monitor with 144Hz refresh rate and 1ms response time.',
        image: ['https://tech-store.tn/wp-content/uploads/2023/08/ecran-gaming-redragon-pearl-23-6-full-hd-incurve-165-hz-1.webp'],
      },
      {
        name: 'Portable Hard Drive 2TB',
        release: '2023-07-20',
        quantity: 100,
        price: 89.99,
        rating: 4.5,
        description: 'Portable hard drive with 2TB storage capacity for gaming and backups.',
        image: ['https://www.jbhifi.com.au/cdn/shop/products/527659-Product-0-I-638424271203709091.jpg?v=1706832372'],
      },
      {
        name: 'PS5 Controller',
        release: '2023-01-15',
        quantity: 80,
        price: 69.99,
        rating: 4.8,
        description: 'High-quality gaming controller with haptic feedback and adaptive triggers.',
        image: ['https://i5.walmartimages.com/seo/SONY-3006393-PS5-WIRELESS-DUALSENSE-CONTROLLER-COSMIC-RED_ea60445c-2b1b-4b27-98de-50d03300a736.3b9b5b8cc9032bfc0104eb32affe03c6.jpeg'],
      },
      {
        name: 'Xbox Series X Controller',
        release: '2023-03-20',
        quantity: 100,
        price: 59.99,
        rating: 4.7,
        description: 'Precision gaming controller with textured grips and custom button mapping.',
        image: ['https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430660_sd.jpg'],
      },

      {
        name: "Nintendo Switch Pro Controller",
        release: '2023-02-10',
        quantity: 120,
        price: 69.99,
        rating: 4.9,
        description: 'Durable controller with motion controls and HD rumble for Nintendo Switch.',
        image: ['https://fr.shopping.rakuten.com/photo/1708555552_L.jpg'],
      },
      {
        name:"Gaming Mouse Pad",
        release: '2022-11-05',
        quantity: 200,
        price: 19.99,
        rating: 4.6,
        description: 'Large gaming mouse pad with smooth surface for precise tracking.',
        image: ['https://kr.thermaltake.com/media/catalog/product/cache/cc8b24283b13da6bc2ff91682c03b54b/l/2/l20mousepad01.jpg'],
      },
      {
        name:"PS4 VR",
        release: '2023-04-01',
        quantity: 50,
        price: 299.99,
        rating: 4.8,
        description: 'Virtual reality headset for PS4 with 360-degree vision and 3D audio.',
        image: ['https://gmedia.playstation.com/is/image/SIEPDC/psvr-overview-hardware-column-image-01-ps4-en-06jan20?$1600px$'],
      }
    ]

    await Accessories.bulkCreate(accessories);
    console.log('Accessories seeds completed successfully')
  } catch (error) {
    console.error('Error seeding accessories:', error)
  }
};

module.exports = accessoriesSeeds;