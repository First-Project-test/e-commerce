const { Electronics, Category } = require('../database')

const electronicsController = {
   
    createElectronics: async (req, res) => {
        try {
            const { name, release, quantity, price, CategoryId, rating, description, image } = req.body
            
           
            if (!name || !quantity || !price || !CategoryId || !description || !image) {
                return res.status(400).json({ message: 'Required fields are missing' })
            }

            
            const category = await Category.findByPk(CategoryId)
            if (!category) {
                return res.status(404).json({ message: 'Category not found' })
            }

            const electronics = await Electronics.create({
                name,
                release,
                quantity,
                price,
                CategoryId,
                rating,
                description,
                image
            })

            res.status(201).json(electronics)
        } catch (error) {
            res.status(500).json({ message: 'Error creating electronic item', error: error.message })
        }
    },

 
    getAllElectronics: async (req, res) => {
        try {
            const { category, sort, page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            
            let whereClause = {}
            let orderClause = []

            if (category) {
                whereClause.CategoryId = category
            }

           
            if (sort) {
                switch (sort) {
                    case 'price_asc':
                        orderClause.push(['price', 'ASC'])
                        break
                    case 'price_desc':
                        orderClause.push(['price', 'DESC'])
                        break
                    case 'rating':
                        orderClause.push(['rating', 'DESC'])
                        break
                    case 'release':
                        orderClause.push(['release', 'DESC'])
                        break
                }
            }

            const electronics = await Electronics.findAndCountAll({
                where: whereClause,
                order: orderClause,
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [{
                    model: Category,
                    attributes: ['name']
                }]
            })

            res.status(200).json({
                electronics: electronics.rows,
                total: electronics.count,
                currentPage: page,
                totalPages: Math.ceil(electronics.count / limit)
            })
        } catch (error) {
            res.status(500).json({ message: 'Error fetching electronics items', error: error.message })
        }
    },

   
    getElectronicsById: async (req, res) => {
        try {
            const { id } = req.params
            const electronics = await Electronics.findByPk(id, {
                include: [{
                    model: Category,
                    attributes: ['name']
                }]
            })

            if (!electronics) {
                return res.status(404).json({ message: 'Electronics item not found' })
            }

            res.status(200).json(electronics)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching electronics item', error: error.message })
        }
    },

   
    updateElectronics: async (req, res) => {
        try {
           
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' })
            }

            const { id } = req.params
            const updateData = req.body

            const electronics = await Electronics.findByPk(id)
            if (!electronics) {
                return res.status(404).json({ message: 'Electronics item not found' })
            }

            await electronics.update(updateData)
            res.status(200).json({
                message: 'Electronics item updated successfully',
                electronics
            })
        } catch (error) {
            res.status(500).json({ message: 'Error updating electronics item', error: error.message })
        }
    },

    
    deleteElectronics: async (req, res) => {
        try {
            
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' })
            }

            const { id } = req.params
            const electronics = await Electronics.findByPk(id)

            if (!electronics) {
                return res.status(404).json({ message: 'Electronics item not found' })
            }

            await electronics.destroy()
            res.status(200).json({ message: 'Electronics item deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting electronics item', error: error.message })
        }
    },

    
    searchElectronics: async (req, res) => {
        try {
            const { query, page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit

            const electronics = await Electronics.findAndCountAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                },
                limit: parseInt(limit),
                offset: parseInt(offset)
            })

            res.status(200).json({
                electronics: electronics.rows,
                total: electronics.count,
                currentPage: page,
                totalPages: Math.ceil(electronics.count / limit)
            })
        } catch (error) {
            res.status(500).json({ message: 'Error searching electronics items', error: error.message })
        }
    },

    
    updateStock: async (req, res) => {
        try {
          
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' })
            }

            const { id } = req.params
            const { quantity } = req.body

            const electronics = await Electronics.findByPk(id)
            if (!electronics) {
                return res.status(404).json({ message: 'Electronics item not found' })
            }

            electronics.quantity = quantity
            await electronics.save()

            res.status(200).json({
                message: 'Stock updated successfully',
                electronics
            })
        } catch (error) {
            res.status(500).json({ message: 'Error updating stock', error: error.message })
        }
    }
}

module.exports = electronicsController
