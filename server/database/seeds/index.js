const { connection } = require('../index');
const userSeeds = require('./userSeeds');
const gameSeeds = require('./gameSeeds');
const electronicsSeeds = require('./electronicsSeeds');
const categorySeeds = require('./categorySeeds');
const gameCategorySeeds = require('./gameCategorySeeds');
const accessoriesSeeds = require('./accessioriesSeeds')

const runSeeds = async () => {
    try {
        console.log('Starting database seeding...');
        
        // Force sync database (this will drop all tables and recreate them)
        await connection.sync({ force: true });
        console.log('Database synced successfully');
        
        // Run seeds in sequence
        await categorySeeds();
        await gameCategorySeeds();
        await userSeeds();
        await gameSeeds();
        await electronicsSeeds();
        await accessoriesSeeds()
        
        console.log('All seeds completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error running seeds:', error);
        process.exit(1);
    }
};

// Run seeds if this file is executed directly
if (require.main === module) {
    runSeeds();
}

module.exports = runSeeds; 