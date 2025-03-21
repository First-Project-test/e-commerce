// const db = require('./database');

// const seedGames = async () => {
//   try {
//     console.log('Adding test game data...');
    
//     // First check if we already have games
//     const existingGames = await db.Game.findAll({
//       attributes: ['id', 'name']
//     });
    
//     if (existingGames.length > 0) {
//       console.log('Games already exist in the database:', existingGames.map(g => g.name));
//       return;
//     }
    
//     // Add some test games
//     await db.Game.create({
//       name: 'The Legend of Zelda',
//       releaseDate: new Date('2023-05-12'),
//       quantity: 10,
//       price: 59.99,
//       rating: 4.8,
//       description: 'An adventure game',
//       image: ['https://via.placeholder.com/150']
//     });
    
//     await db.Game.create({
//       name: 'Mario Kart',
//       releaseDate: new Date('2022-10-05'),
//       quantity: 15,
//       price: 49.99,
//       rating: 4.5,
//       description: 'A racing game',
//       image: ['https://via.placeholder.com/150']
//     });
    
//     await db.Game.create({
//       name: 'Minecraft',
//       releaseDate: new Date('2021-04-15'),
//       quantity: 20,
//       price: 29.99,
//       rating: 4.7,
//       description: 'A sandbox game',
//       image: ['https://via.placeholder.com/150']
//     });
    
//     console.log('Test game data added successfully!');
//   } catch (error) {
//     console.error('Error adding test data:', error);
//   } finally {
//     process.exit(0);
//   }
// };

// seedGames(); 