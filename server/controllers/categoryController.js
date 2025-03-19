const { Category, Electronics } = require('../database');
const { Op } = require('sequelize');

const categoryController = {
    // Create a new category
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            
            if (!name) {
                return res.status(400).json({ message: 'Category name is required' });
            }

            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error: error.message });
        }
    },

    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll({
                include: [{
                    model: Electronics,
                    attributes: ['id', 'name', 'price']
                }]
            });
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },

    // Get category by ID
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id, {
                include: [{
                    model: Electronics,
                    attributes: ['id', 'name', 'price', 'description']
                }]
            });

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error: error.message });
        }
    },

    // Update category
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findByPk(req.params.id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.update({ name });
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error: error.message });
        }
    },

    // Delete category
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.destroy();
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }
};

module.exports = categoryController; 