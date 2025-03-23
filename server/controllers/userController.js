const jwt = require('jsonwebtoken')
const { User } = require('../database')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const userController = {
    authMiddleware: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' })
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
        } catch {
            res.status(401).json({ message: 'Invalid token' })
        }
    },

    adminMiddleware: (req, res, next) => {
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(403).json({ message: 'Access denied' })
        }
    },

    register: async (req, res) => {
        const { username, password, email, role } = req.body

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        try {
            const existingUser = await User.findOne({
                where: { [Op.or]: [{ email }, { username }] }
            })
            ////

            if (existingUser) {
                const message = existingUser.email === email
                    ? 'Email already registered'
                    : 'Username already taken'
                return res.status(400).json({ message })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                role: role || 'user',
                cart: []
            })

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            )

            res.status(201).json({
                message: 'User created successfully',
                token,
                user: { id: user.id, username: user.username, email: user.email, role: user.role }
            })
        } catch {
            res.status(500).json({ message: 'Error creating user' })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        try {
            const user = await User.findOne({ where: { email } })
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            )

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { id: user.id, username: user.username, email: user.email, role: user.role }
            })
        } catch {
            res.status(500).json({ message: 'Error logging in' })
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.userId, {
                attributes: { exclude: ['password'] }
            })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            res.status(200).json(user)
        } catch {
            res.status(500).json({ message: 'Error fetching profile' })
        }
    },

    updateProfile: async (req, res) => {
        const { username, email, currentPassword, newPassword } = req.body

        try {
            const user = await User.findByPk(req.user.userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            if (username) user.username = username
            if (email) user.email = email

            if (currentPassword && newPassword) {
                if (!(await bcrypt.compare(currentPassword, user.password))) {
                    return res.status(401).json({ message: 'Current password is incorrect' })
                }
                user.password = await bcrypt.hash(newPassword, 10)
            }

            await user.save()
            res.status(200).json({ message: 'Profile updated successfully', user })
        } catch {
            res.status(500).json({ message: 'Error updating profile' })
        }
    },

    updateCart: async (req, res) => {
        const { cart } = req.body

        try {
            const user = await User.findByPk(req.user.userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            user.cart = cart
            await user.save()

            res.status(200).json({ message: 'Cart updated successfully', cart: user.cart })
        } catch {
            res.status(500).json({ message: 'Error updating cart' })
        }
    },

    getAllUsers: async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }

        const { page = 1, limit = 10, search } = req.query
        const offset = (page - 1) * limit

        try {
            const whereClause = search
                ? { [Op.or]: [{ username: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }] }
                : {}

            const users = await User.findAndCountAll({
                where: whereClause,
                attributes: { exclude: ['password'] },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']]
            })

            res.status(200).json({
                users: users.rows,
                total: users.count,
                currentPage: page,
                totalPages: Math.ceil(users.count / limit)
            })
        } catch {
            res.status(500).json({ message: 'Error fetching users' })
        }
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params

        if (req.user.role !== 'admin' && req.user.userId !== userId) {
            return res.status(403).json({ message: 'Access denied' })
        }

        try {
            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            await user.destroy()
            res.status(200).json({ message: 'User deleted successfully' })
        } catch {
            res.status(500).json({ message: 'Error deleting user' })
        }
    },
    BanUser: async (req, res) => {
        const { userId } = req.params

        // if (req.user.role !== 'admin' && req.user.userId !== userId) {
        //     return res.status(403).json({ message: 'Access denied' })
        // }

        try {
            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            await user.update({banned:req.body.banned})
            res.status(200).json({ message: 'User deleted successfully' })
        } catch {
            res.status(500).json({ message: 'Error deleting user' })
        }
    }
}

module.exports = userController