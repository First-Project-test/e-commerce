const gameCategory = require('../gameCategory');
const { Game, GameCategory } = require('../index');

const gameSeeds = async () => {
    try {
        await Game.destroy({ where: {} })

        
        const actionCategory = await GameCategory.findOne({ where: { name: 'Action'}})
        const adventureCategory = await GameCategory.findOne({ where: { name: 'Adventure'}})
        const rpgCategory = await GameCategory.findOne({ where: { name: 'RPG'}})
        const sportsCategory = await GameCategory.findOne({ where: { name: 'Sports'}})
        const fightingCategory = await GameCategory.findOne({ where: { name: 'Fighting'}})
        const horrorCategory = await GameCategory.findOne({ where: { name: 'Horror'}})

        const games = [
            {
                name:"Hell is Us",
                releaseDate:"2023-10-15",
                quantity: 75,
                price: 89.99,
                category: ["Horror", "Adventure"],
                rating: 4.7,
                description: "A psychological horror game set in a dark and twisted world.",
                image: ["https://gameworld.tn/16018-medium_default/hell-is-us.jpg"],
                GameCategoryId: horrorCategory.id

            },
            {
                name: 'The Legend of Zelda',
                releaseDate: '2017-03-03',
                quantity: 50,
                price: 59.99,
                category: ['Action', 'Adventure', 'RPG'],
                rating: 4.5,
                description: 'An epic adventure across the vast lands of Hyrule in this critically acclaimed game.',
                image: 'https://gameworld.tn/1885-home_default/the-legend-of-zelda-breath-of-the-wild.jpg',
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
                image: ['https://gameworld.tn/1955-medium_default/red-dead-redemption-ii.jpg'],
                GameCategoryId: actionCategory.id
            },
            {
                name: 'Elden Ring',
                releaseDate: '2022-02-25',
                quantity: 125,
                price: 59.99,
                category: ['Action', 'RPG', 'Souls-like'],
                rating: 4.9,
                description: 'Explore the vast world of the Lands Between in this epic fantasy adventure.',
                image: ['https://gameworld.tn/14619-home_default/elden-ring-shadow-of-the-erdtree.jpg'],
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
                image: ['https://gameworld.tn/5930-medium_default/god-of-war-ragnaroek.jpg'],
                GameCategoryId: actionCategory.id
            },
            {
                name: 'FIFA 25' ,
                releaseDate: '2024-09-15',
                quantity: 80,
                price: 69.99,
                category: ['Sports'],
                rating: 4.5,
                description: 'The latest installment in the FIFA series with updated teams and gameplay.',
                image: ['https://gameworld.tn/14592-home_default/ea-sports-fc-25.jpg'],
                GameCategoryId: sportsCategory.id
            },
            {
                name:"Cyberpunk 2077",
                releaseDate:"2020-12-10",
                quantity: 100,
                price: 79.99,
                category: ["Action", "RPG", "Sci-fi"],
                rating: 4.2,
                description: "An open-world RPG set in the dystopian Night City.",
                image: ["https://gameworld.tn/1941-medium_default/cyberpunk-2077.jpg"],
                GameCategoryId: rpgCategory.id
            },
            {
                name:"Call of duty black ops 6",
                releaseDate:"2025-11-15",
                quantity: 15,
                price: 69.99,
                category: ["Action"],
                rating: 4.7,
                description: "The latest installment in the Call of Duty series with new maps and weapons.",
                image: ["https://gameworld.tn/14618-home_default/call-of-duty-black-ops-6.jpg"],
                GameCategoryId: actionCategory.id
            },
            {
                name:"Tekken 8",
                releaseDate:"2024-06-10",
                quantity: 85,
                price: 69.99,
                category: ["Fighting"],
                rating: 4.5,
                description: "The next chapter in the Tekken series with new characters and moves.",
                image: ["https://gameworld.tn/10816-home_default/tekken-8.jpg"],
                GameCategoryId: fightingCategory.id
            },
            {
                name:"Resident Evil Village",
                releaseDate:"2021-05-07",
                quantity: 90,
                price: 59.99,
                category: ["Horror"],
                rating: 4.9,
                description: "A survival horror game set in a mysterious village with terrifying creatures.",   
                image: ["https://gameworld.tn/1958-medium_default/resident-evil-village.jpg"],
                GameCategoryId: horrorCategory.id
            },
            {
                name:"WWE 2K25",
                releaseDate:"2025-10-15",
                quantity: 15,
                price: 69.99,
                category: ["Sports"],
                rating: 4.4,
                description: "The latest installment in the WWE series with new wrestlers and moves.",
                image: ["https://gameworld.tn/17169-home_default/wwe-2k25.jpg"],
                gameCategoryId: sportsCategory.id

            },
            {
                name:"Little Nightmares III",
                releaseDate:"2023-04-10",
                quantity: 150,
                price: 49.99,
                category: ["Horror"],
                rating: 4.6,
                description: "A suspense-adventure game set in a dark and whimsical world.",
                image: ["https://gameworld.tn/15858-home_default/little-nightmares-iii.jpg"],
                GameCategoryId: horrorCategory.id

            },
            {
                name:"Ghost of Yōtei",
                releaseDate:"2023-08-15",
                quantity: 60,
                price: 89.99,
                category: ["Action", "Adventure"],
                rating: 4.8,
                description: "An open-world adventure game set in the snowy mountains of Yōtei.",
                image: ["https://gameworld.tn/15860-home_default/ghost-of-yotei.jpg"],
                GameCategoryId: adventureCategory.id

            },
            {
                name:"Black Myth Wukong",  
                releaseDate:"2023-12-10",
                quantity: 35,
                price: 99.99,
                category: ["Action", "Adventure"],
                rating: 4.9,
                description: "An action-adventure game based on the Chinese classic Journey to the West.",
                image: ["https://gameworld.tn/13625-home_default/black-myth-wukong.jpg"],
                GameCategoryId: adventureCategory.id

            },
            {
                name:"Marvel's Spider Man 2",
                releaseDate:"2023-11-15",
                quantity: 100,
                price: 79.99,
                category: ["Action", "Adventure"],
                rating: 4.7,
                description: "The sequel to the critically acclaimed Marvel's Spider",
                image: ["https://gameworld.tn/9649-home_default/marvel-s-spider-man-2.jpg"],
                GameCategoryId: adventureCategory.id

            },
            {
                name:"Sonic Superstars",
                releaseDate:"2024-03-10",
                quantity: 40,
                price: 59.99,
                category: ["Adventure", "Racing"],
                rating: 4.3,
                description: "A racing game featuring Sonic and other SEGA characters.",
                image: ["https://gameworld.tn/9643-home_default/sonic-superstars.jpg"],
                GameCategoryId: adventureCategory.id

            },
            {
                name:"NBA 2K25",
                releaseDate:"2025-09-15",
                quantity: 65,
                price: 69.99,
                category: ["Sports"],
                rating: 4.5,
                description: "The latest installment in the NBA 2K series with updated teams and gameplay.",
                image: ["https://gameworld.tn/14665-home_default/nba-2k25.jpg"],
                GameCategoryId: sportsCategory.id

            },
            {
                name:"Dragon Ball FighterZ",
                releaseDate:"2023-06-10",
                quantity: 100,
                price: 59.99,
                category: ["Fighting"],
                rating: 4.6,
                description: "A fighting game featuring characters from the Dragon Ball universe.",
                image: ["https://gameworld.tn/3601-home_default/dragon-ball-fighterz.jpg"],
                GameCategoryId: fightingCategory.id

            },
            {
                name:"Disney Epic Mickey Rebrushed" ,
                releaseDate:"2023-05-07",
                quantity: 100,
                price: 39.99,
                category: ["Adventure"],
                rating: 4.4,
                description: "A remastered version of the classic Disney game with updated graphics.",
                image: ["https://gameworld.tn/12997-home_default/disney-epic-mickey-rebrushed.jpg"],
                GameCategoryId: adventureCategory.id
            },
            {
                name:"Ark : Survival Ascended",
                releaseDate:"2023-10-15",
                quantity: 50,
                price: 59.99,
                category: ["Action", "Adventure"],
                rating: 4.7,
                description: "An open-world survival game set in a world filled with dinosaurs.",
                image: ["https://gameworld.tn/14121-home_default/ark-survival-ascended.jpg"],
                GameCategoryId: actionCategory.id
            },

            {
                name:"Mortal Kombat 11 Ultimate",
                releaseDate:"2024-06-10",
                quantity: 30,
                price:79.99,
                category: ["Fighting"],
                rating: 4.8,
                description: "The ultimate edition of Mortal Kombat 11 with all DLC characters and skins.",
                image: ["https://gameworld.tn/1943-medium_default/mortal-kombat-11-ultimate.jpg"],
                GameCategoryId: fightingCategory.id

            },
        ]

        await Game.bulkCreate(games)
        console.log('Game seeds completed successfully')
    } catch (error) {
        console.error('Error seeding games:', error)
    }
}

module.exports = gameSeeds 