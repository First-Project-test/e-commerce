const { Game, GameCategory } = require('../index');

const gameSeeds = async () => {
    try {
        // Clear existing games
        await Game.destroy({ where: {} });

        // Get all game categories
        const actionCategory = await GameCategory.findOne({ where: { name: 'Action' } });
        const adventureCategory = await GameCategory.findOne({ where: { name: 'Adventure' } });
        const rpgCategory = await GameCategory.findOne({ where: { name: 'RPG' } });
        const strategyCategory = await GameCategory.findOne({ where: { name: 'Strategy' } });

        // Create sample games
        const games = [
            {
                name: 'The Legend of Zelda: Breath of the Wild',
                releaseDate: '2017-03-03',
                quantity: 50,
                price: 59.99,
                category: ['Action', 'Adventure', 'RPG'],
                rating: 4.5,
                description: 'An epic adventure across the vast lands of Hyrule in this critically acclaimed game.',
                image: 'https://assets.nintendo.com/image/upload/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58',
                GameCategoryId: adventureCategory.id
            },
            {
                name: 'Red Dead Redemption 2',
                releaseDate: '2018-10-26',
                quantity: 75,
                price: 49.99,
                category: ['Action', 'Adventure', 'Western'],
                rating: 4.8,
                description: 'Experience the Wild West in this stunning open-world adventure.',
                image: 'https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg?resize=1&w=480&h=270&quality=medium',
                GameCategoryId: actionCategory.id
            },
            {
                name: 'Elden Ring',
                releaseDate: '2022-02-25',
                quantity: 100,
                price: 59.99,
                category: ['Action', 'RPG', 'Souls-like'],
                rating: 4.9,
                description: 'Explore the vast world of the Lands Between in this epic fantasy adventure.',
                image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1739922037',
                GameCategoryId: rpgCategory.id
            },
            {
                name: 'God of War Ragnarök',
                releaseDate: '2022-11-09',
                quantity: 60,
                price: 59.99,
                category: ['Action', 'Adventure', 'Hack and Slash'],
                rating: 4.9,
                description: 'Continue Kratos and Atreus\'s epic journey through the nine realms.',
                image: 'https://www.games-geeks.fr/wp-content/uploads/2022/11/1273405-scaled.jpg',
                GameCategoryId: actionCategory.id
            },
            {
                name: 'Baldur\'s Gate 3',
                releaseDate: '2023-08-03',
                quantity: 80,
                price: 59.99,
                category: ['RPG', 'Strategy', 'Fantasy'],
                rating: 4.7,
                description: 'Embark on an epic adventure in this critically acclaimed RPG.',
                image: 'https://products.eneba.games/resized-products/aV8sR5OTofdMsHXxAOtw2uRbEr87JNOyx8obQal2oEw_350x200_1x-0.jpg',
                GameCategoryId: strategyCategory.id
            }
        ];

        await Game.bulkCreate(games);
        console.log('Game seeds completed successfully');
    } catch (error) {
        console.error('Error seeding games:', error);
    }
};

module.exports = gameSeeds; 