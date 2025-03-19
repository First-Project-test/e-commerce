const { Cart, Electronics, Game } = require('../database');

const cartController = {
    // Add item to cart
    addToCart: async (req, res) => {
        try {
            const { itemId, itemType, quantity = 1 } = req.body;
            const userId = req.user.id;

            // Validate item type
            if (!['electronics', 'game'].includes(itemType)) {
                return res.status(400).json({ message: 'Invalid item type' });
            }

            // Get item based on type
            let item;
            if (itemType === 'electronics') {
                item = await Electronics.findByPk(itemId);
            } else {
                item = await Game.findByPk(itemId);
            }

            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            // Check if item already in cart
            const existingCartItem = await Cart.findOne({
                where: {
                    UserId: userId,
                    itemType: itemType,
                    [itemType === 'electronics' ? 'ElectronicsId' : 'GameId']: itemId
                }
            });

            if (existingCartItem) {
                // Update quantity if item exists
                await existingCartItem.update({
                    quantity: existingCartItem.quantity + quantity,
                    totalPrice: item.price * (existingCartItem.quantity + quantity)
                });
            } else {
                // Create new cart item
                await Cart.create({
                    UserId: userId,
                    itemType: itemType,
                    [itemType === 'electronics' ? 'ElectronicsId' : 'GameId']: itemId,
                    quantity: quantity,
                    totalPrice: item.price * quantity
                });
            }

            res.status(201).json({ message: 'Item added to cart successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        }
    },

    // Get user's cart
    getCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const cartItems = await Cart.findAll({
                where: { UserId: userId },
                include: [
                    {
                        model: Electronics,
                        attributes: ['name', 'price', 'description'],
                        required: false
                    },
                    {
                        model: Game,
                        attributes: ['name', 'price', 'description'],
                        required: false
                    }
                ]
            });

            const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
            res.json({ items: cartItems, total });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cart', error: error.message });
        }
    },

    // Update cart item quantity
    updateCartItem: async (req, res) => {
        try {
            const { quantity } = req.body;
            const { id } = req.params;
            const userId = req.user.id;

            const cartItem = await Cart.findOne({
                where: {
                    id: id,
                    UserId: userId
                },
                include: [Electronics, Game]
            });

            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            const item = cartItem.itemType === 'electronics' ? cartItem.Electronics : cartItem.Game;
            await cartItem.update({
                quantity: quantity,
                totalPrice: item.price * quantity
            });

            res.json(cartItem);
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        }
    },

    // Remove item from cart
    removeFromCart: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const cartItem = await Cart.findOne({
                where: {
                    id: id,
                    UserId: userId
                }
            });

            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            await cartItem.destroy();
            res.json({ message: 'Item removed from cart successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        }
    },

    // Clear user's cart
    clearCart: async (req, res) => {
        try {
            const userId = req.user.id;
            await Cart.destroy({
                where: { UserId: userId }
            });
            res.json({ message: 'Cart cleared successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        }
    }
};

module.exports = cartController; 