const { GameCategory } = require('../index');

const gameCategorySeeds = async () => {
    try {
        // Clear existing game categories
        await GameCategory.destroy({ where: {} });

        // Create sample game categories
        const gameCategories = [
            {
                name: 'Action',
                description: 'Fast-paced action games'
            },
            {
                name: 'Adventure',
                description: 'Story-driven adventure games'
            },
            {
                name: 'RPG',
                description: 'Role-playing games'
            },
            {
                name: 'Sports',
                description: 'Sports and racing games'
            },
            {
                name: 'Fighting',
                description: 'Fighting and combat games'
            },
            {
                name: 'Horror',
                description: 'Horror and survival games'
            }
        ];

        await GameCategory.bulkCreate(gameCategories);
        console.log('Game Category seeds completed successfully');
    } catch (error) {
        console.error('Error seeding game categories:', error);
    }
};

module.exports = gameCategorySeeds; 