const { Game, GameCategory } = require('../database');

const gameController = {
    // Create a new game
    createGame: async (req, res) => {
        try {
            const { name, releaseDate, quantity, price, categoryId, rating, description, image } = req.body;
            
            // Validate required fields
            if (!name || !quantity || !price || !categoryId || !description) {
                return res.status(400).json({ message: 'Required fields are missing' });
            }

            // Check if category exists
            const category = await GameCategory.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Game category not found' });
            }

            const game = await Game.create({
                name,
                releaseDate,
                quantity,
                price,
                GameCategoryId: categoryId,  // Changed to match the model relationship
                rating,
                description,
                image
            });

            res.status(201).json(game);
        } catch (error) {
            res.status(500).json({ message: 'Error creating game', error: error.message });
        }
    },

    // Get all games with their categories
    getAllGames: async (req, res) => {
        try {
          const games = await Game.findAll(); // Fetch all games
          res.status(200).json(games);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching games', error: error.message });
        }
      },

    // Get games by category
    getGamesByCategory: async (req, res) => {
        try {
          const { categoryId } = req.params;
          const games = await Game.findAll({
            where: { GameCategoryId: categoryId }, // Filter games by category ID
          });
          res.status(200).json(games);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching games by category', error: error.message });
        }
      },

    // Get game by ID with its categories
    getGameById: async (req, res) => {
        try {
            const game = await Game.findByPk(req.params.id, {
                include: [{
                    model: GameCategory,
                    attributes: ['id', 'name']
                }]
            });
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.status(200).json(game);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching game', error: error.message });
        }
    },

    // Update a game
    updateGame: async (req, res) => {
        try {
            const game = await Game.findByPk(req.params.id);
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }
            await game.update(req.body);
            res.status(200).json(game);
        } catch (error) {
            res.status(500).json({ message: 'Error updating game', error: error.message });
        }
    },

    // Delete a game
    deleteGame: async (req, res) => {
        try {
            const game = await Game.findByPk(req.params.id);
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