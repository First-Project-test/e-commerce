const { Accessories } = require('../database/index')

module.exports = {
    getAllAccessories: async (req, res) => {
        try {
            const accessories = await Accessories.findAll()
            res.status(200).json(accessories)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching accessories', error: error.message })
        }
    },

    AddAccessories: async (req, res) => {
        const { name, imageUrl, price, quantity, CategoryId } = req.body
        try {
            if (!name || !imageUrl || !price || !quantity || !CategoryId) {
                return res.status(400).json({ message: 'Required fields are missing' })
            }
            const added = await Accessories.create({ name, imageUrl, price, quantity, CategoryId })
            res.status(201).json(added)
        } catch (error) {
            res.status(500).json({ message: 'Error adding accessory', error: error.message })
        }
    },

    DeleteAccessories: async (req, res) => {
        const { id } = req.params
        try {
            const accessory = await Accessories.findByPk(id)
            if (!accessory) {
                return res.status(404).json({ message: 'Accessory not found' })
            }
            await accessory.destroy()
            res.status(200).json({ message: 'Accessory deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting accessory', error: error.message })
        }
    },

    UpdateAccessories: async (req, res) => {
        const { id } = req.params
        const { name, imageUrl, price, quantity, CategoryId } = req.body
        try {
            const accessory = await Accessories.findByPk(id)
            if (!accessory) {
                return res.status(404).json({ message: 'Accessory not found' })
            }
            await accessory.update({ name, imageUrl, price, quantity, CategoryId })
            res.status(200).json({ message: 'Accessory updated successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Error updating accessory', error: error.message })
        }
    },

    getAccessoriesByOne: async (req, res) => {
        const { id } = req.params
        try {
            const accessory = await Accessories.findByPk(id)
            if (!accessory) {
                return res.status(404).json({ message: 'Accessory not found' })
            }
            res.status(200).json(accessory)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching accessory', error: error.message })
        }
    }
}