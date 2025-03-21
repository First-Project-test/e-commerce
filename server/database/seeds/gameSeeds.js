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
                image: 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
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
                image: 'https://i5.walmartimages.com/seo/Red-Dead-Redemption-2-Xbox-One_6189c6e7-289a-4aaa-9d7e-33e318439c17_2.a5bc3629ca9c5f6de715696bade8b413.png',
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
                image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
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
                image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg',
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