const jwt = require('jsonwebtoken');
const { User } = require('../database');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const userController = {
    // Middleware functions
    authMiddleware: (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    },

    adminMiddleware: (req, res, next) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    },

    // Register new user
    register: async (req, res) => {
        try {
            const { username, password, email, role = 'user' } = req.body;
            
            // Validate input
            if (!username || !password || !email) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { username }
                    ]
                }
            });
            ////

            if (existingUser) {
                return res.status(400).json({ 
                    message: existingUser.email === email ? 
                        'Email already registered' : 
                        'Username already taken' 
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                role,
                cart: []
            });

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'User created successfully',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    },

    // Get user profile
    getProfile: async (req, res) => {
        try {
            const userId = req.user.userId; // From auth middleware
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
    },

    // Update user profile
    updateProfile: async (req, res) => {
        try {
            const userId = req.user.userId; // From auth middleware
            const { username, email, currentPassword, newPassword } = req.body;

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if username or email is already taken by another user
            if (username && username !== user.username) {
                const existingUser = await User.findOne({
                    where: {
                        username,
                        id: { [Op.ne]: userId }
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ message: 'Username already taken' });
                }
            }

            if (email && email !== user.email) {
                const existingUser = await User.findOne({
                    where: {
                        email,
                        id: { [Op.ne]: userId }
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already registered' });
                }
            }

            // Update fields
            if (username) user.username = username;
            if (email) user.email = email;

            // Update password if provided
            if (currentPassword && newPassword) {
                const isValidPassword = await bcrypt.compare(currentPassword, user.password);
                if (!isValidPassword) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }
                user.password = await bcrypt.hash(newPassword, 10);
            }

            await user.save();

            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    },

    // Update cart
    updateCart: async (req, res) => {
        try {
            const userId = req.user.userId; // From auth middleware
            const { cart } = req.body;

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.cart = cart;
            await user.save();

            res.status(200).json({
                message: 'Cart updated successfully',
                cart: user.cart
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart', error: error.message });
        }
    },

    // Get all users (admin only)
    getAllUsers: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            const { page = 1, limit = 10, search } = req.query;
            const offset = (page - 1) * limit;

            let whereClause = {};
            if (search) {
                whereClause = {
                    [Op.or]: [
                        { username: { [Op.like]: `%${search}%` } },
                        { email: { [Op.like]: `%${search}%` } }
                    ]
                };
            }

            const users = await User.findAndCountAll({
                where: whereClause,
                attributes: { exclude: ['password'] },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                users: users.rows,
                total: users.count,
                currentPage: page,
                totalPages: Math.ceil(users.count / limit)
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    // Delete user (admin only or own account)
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            
            // Check if user has permission to delete
            if (req.user.role !== 'admin' && req.user.userId !== userId) {
                return res.status(403).json({ message: 'Access denied' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};

module.exports = userController;
