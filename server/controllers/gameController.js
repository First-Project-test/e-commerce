const Game = require('../database/game');

const gameController = {
    // Create new game
    createGame: async (req, res) => {
        try {
            // Check if user is admin
            // if (req.user.role !== 'admin') {
            //     return res.status(403).json({ message: 'Access denied' });
            // }

            const { name, release, quantity, price, category, rating, description } = req.body;

            const game = await Game.create({
                name,
                release,
                quantity,
                price,
                category,
                rating,
                description
            });

            res.status(201).json({
                message: 'Game created successfully',
                game
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating game', error: error.message });
        }
    },

    // Get all games
    getAllGames: async (req, res) => {
        try {
            const games=Game.findAll()
            res.status(200).send(games)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching games', error: error.message });
        }
    },

    // Get single game by ID
    getGameById: async (req, res) => {
        try {
            const { id } = req.params;
            const game = await Game.findByPk(id);

            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            res.status(200).json(game);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching game', error: error.message });
        }
    },

    // Update game
    updateGame: async (req, res) => {
        try {
            // Check if user is admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            const { id } = req.params;
            const updateData = req.body;

            const game = await Game.findByPk(id);
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            await game.update(updateData);
            res.status(200).json({
                message: 'Game updated successfully',
                game
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating game', error: error.message });
        }
    },

    // Delete game
    deleteGame: async (req, res) => {
        try {
            // Check if user is admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            const { id } = req.params;
            const game = await Game.findByPk(id);

            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            await game.destroy();
            res.status(200).json({ message: 'Game deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting game', error: error.message });
        }
    },

    // Search games
    searchGames: async (req, res) => {
        try {
            const { query, page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const games = await Game.findAndCountAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                },
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            res.status(200).json({
                games: games.rows,
                total: games.count,
                currentPage: page,
                totalPages: Math.ceil(games.count / limit)
            });
        } catch (error) {
            res.status(500).json({ message: 'Error searching games', error: error.message });
        }
    }
};

module.exports = gameController; 