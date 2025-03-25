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
        
        await connection.sync({ force: true });
        console.log('Database synced successfully');

        await categorySeeds()
        await gameCategorySeeds()
        await userSeeds()
        await gameSeeds()
        await electronicsSeeds()
        await accessoriesSeeds()
        
        console.log('All seeds completed successfully!')
        process.exit(0)
    } catch (error){
        console.error('Error running seeds:', error)
        process.exit(1)
    }
}


if (require.main === module) {
    runSeeds();
}

module.exports = runSeeds; 