const category = require('../category');
const { Electronics } = require('../index');

const electronicsSeeds = async () => {
    try {
        
        await Electronics.destroy({ where:{}})

    
        const electronics = [
            {
                name:"Sony PlayStation 5",
                release:"2020-11-12",
                quantity:20,
                price:499.99,
                rating:93,
                description:"Next-gen gaming console with stunning graphics and fast loading times.",
                image:"https://gameszone.tn/462-large_default/playstation-5-standard-ps5-tunisie.jpg",
                category:["Gaming Console","Hardware"],
            },
            {
                name: 'Sony PlayStation 5 Pro',
                release: '2020-11-12',
                quantity: 30,
                price: 599.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 95,
                description: 'Next-gen gaming console with stunning graphics and fast loading times.' ,
                image:"https://gameszone.tn/602-large_default/playstation-5-pro-ps5-tunisie.jpg"
            },
            {
                name: 'Xbox Series X',
                release: '2020-11-10',
                quantity: 25,
                price: 499.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 94,
                description: 'Powerful gaming console with Game Pass subscription service.',
                image:"https://cms-assets.xboxservices.com/assets/f0/8d/f08dfa50-f2ef-4873-bc8f-bcb6c34e48c0.png?n=642227_Hero-Gallery-0_C2_857x676.png"
            }, 
            {
                name: 'Xbox Series S',
                release: '2020-11-10',
                quantity: 15,
                price: 299.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 90,
                description: 'Affordable gaming console with Game Pass subscription service.',      
                image:"https://gameszone.tn/494-large_default/xbox-series-s-digital-edition-console-tunisie.jpg"
                
            },
            {
                name: 'Nintendo Switch OLED',
                release: '2021-10-08',
                quantity: 40,
                price: 349.99,
                category: ['Gaming Console', 'Hardware'],
                rating: 92,
                description: 'Portable gaming console with enhanced OLED display.',
                image:"https://gameszone.tn/553-large_default/nintendo-switch-oled-edition-splatoon-3-tunisie.jpg"
            },
            {
                name:"Sony PlayStation 4",
                release:"2013-11-15",
                quantity:10,
                price:299.99,
                rating:88,
                description:"Previous-gen gaming console with a vast library of games.",
                image:"https://gameszone.tn/1050-large_default/playstation-4-slim-occasion.jpg",
                category:["Gaming Console","Hardware"],
            },
            {
                name:"PC Gaming",
                release:"2021-01-01",
                quantity:50,
                price:999.99,
                rating:96,
                description:"Customizable gaming PC with high performance and graphics.",
                image:"https://www.sbsinformatique.com/16413/tunisie/large/pc-gamer-killer-ryzen-5-4500-gtx-1660-ti-16gb-512-gb-tunisie.jpg",
                category:["Gaming Console","Hardware"],
                
            },
            {
                name:"Gaming Laptop",
                release:"2021-02-01",
                quantity:30,
                price:1299.99,
                rating:94,
                description:"Portable gaming laptop with high refresh rate and RTX graphics.",
                image:"https://www.asus.com/media/global/gallery/ibht3480pzgjpbde_setting_xxx_0_90_end_800.png", 
                category:["Gaming Console","Hardware"], 

            }
           
        ];

        await Electronics.bulkCreate(electronics);
        console.log('Electronics seeds completed successfully')
    } catch (error) {
        console.error('Error seeding electronics:', error)
    }
}

module.exports = electronicsSeeds; 