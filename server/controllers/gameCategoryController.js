const { GameCategory, Game } = require('../database')
const { Op } = require('sequelize')

const gameCategoryController = {
    
    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            
            if (!name) {
                return res.status(400).json({ message: 'Category name is required' })
            }

            const category = await GameCategory.create({ name })
            res.status(201).json(category)
        } catch (error) {
            res.status(500).json({ message: 'Error creating game category', error: error.message })
        }
    },

   
    getAllCategories: async (req, res) => {
        try {
            const categories = await GameCategory.findAll()
            res.json(categories)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching game categories', error: error.message })
        }
    },

   
    getCategoryById: async (req, res) => {
        try {
            const category = await GameCategory.findByPk(req.params.id, {
                include: [{
                    model: Game,
                    attributes: ['id', 'name', 'price', 'description', 'rating']
                }]
            })

            if (!category) {
                return res.status(404).json({ message: 'Game category not found' })
            }

            res.json(category)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching game category', error: error.message })
        }
    },

   
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            const category = await GameCategory.findByPk(req.params.id)

            if (!category) {
                return res.status(404).json({ message: 'Game category not found' })
            }

            await category.update({ name })
            res.json(category)
        } catch (error) {
            res.status(500).json({ message: 'Error updating game category', error: error.message })
        }
    },

   
    deleteCategory: async (req, res) => {
        try {
            const category = await GameCategory.findByPk(req.params.id)

            if (!category) {
                return res.status(404).json({ message: 'Game category not found' })
            }

            await category.destroy()
            res.json({ message: 'Game category deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting game category', error: error.message })
        }
    }
}

module.exports = gameCategoryController 