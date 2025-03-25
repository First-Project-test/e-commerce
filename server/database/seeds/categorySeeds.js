const { Category } = require('../index');

const categorySeeds = async () => {
    try {
        
        await Category.destroy({ where:{}})

       
        const categories = [
            {
                name: 'Gaming Consoles',
                description: 'Latest gaming consoles and systems'
            },
            {
                name: 'Accessories',
                description: 'Gaming accessories and peripherals'
            },
            {
                name: 'Audio',
                description: 'Gaming headsets and audio equipment'
            },
            {
                name: 'Controllers',
                description: 'Game controllers and input devices'
            },
            {
                name: 'Storage',
                description: 'Gaming storage solutions'
            }
        ];

        await Category.bulkCreate(categories);
        console.log('Category seeds completed successfully')
    } catch (error) {
        console.error('Error seeding categories:', error)
    }
}

module.exports = categorySeeds; 