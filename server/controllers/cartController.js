const { Cart, Game, Electronics, User } = require('../database');

const cartController = {
    // Get user's cart
    getCart: async (req, res) => {
        try {
            const userId = req.user.userId; // Get user ID from authenticated user

            const cartItems = await Cart.findAll({
                where: { UserId: userId },
                include: [
                    {
                        model: Game,
                        attributes: ['id', 'name', 'price', 'description']
                    },
                    {
                        model: Electronics,
                        attributes: ['id', 'name', 'price', 'description']
                    }
                ]
            });

            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cart', error: error.message });
        }
    },

    // Add item to cart
    addToCart: async (req, res) => {
        try {
            const userId = req.user.userId; // Get user ID from authenticated user
            const { gameId, electronicsId, quantity = 1 } = req.body;

            // Validate that either gameId or electronicsId is provided
            if (!gameId && !electronicsId) {
                return res.status(400).json({ message: 'Either gameId or electronicsId is required' });
            }

            // Check if user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if item exists and has sufficient stock
            let item;
            let itemType;
            if (gameId) {
                item = await Game.findByPk(gameId);
                if (!item) {
                    return res.status(404).json({ message: 'Game not found' });
                }
                if (item.quantity < quantity) {
                    return res.status(400).json({ message: 'Insufficient game stock' });
                }
                itemType = 'game';
            } else {
                item = await Electronics.findByPk(electronicsId);
                if (!item) {
                    return res.status(404).json({ message: 'Electronics item not found' });
                }
                if (item.quantity < quantity) {
                    return res.status(400).json({ message: 'Insufficient electronics stock' });
                }
                itemType = 'electronics';
            }

            // Check if item already exists in cart
            const existingCartItem = await Cart.findOne({
                where: {
                    UserId: userId,
                    itemType: itemType,
                    [itemType === 'electronics' ? 'ElectronicsId' : 'GameId']: itemType === 'electronics' ? electronicsId : gameId
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
                    GameId: gameId,
                    ElectronicId: electronicsId,
                    quantity: quantity,
                    totalPrice: item.price * quantity
                });
            }

            res.status(200).json({ message: 'Item added to cart successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        }
    },

    // Update cart item quantity
    updateCartItem: async (req, res) => {
        try {
            const userId = req.user.userId; // Get user ID from authenticated user
            const { cartItemId } = req.params;
            const { quantity } = req.body;

            const cartItem = await Cart.findOne({
                where: {
                    id: cartItemId,
                    UserId: userId
                }
            });

            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            // Check stock availability
            const item = cartItem.itemType === 'electronics' 
                ? await Electronics.findByPk(cartItem.ElectronicsId)
                : await Game.findByPk(cartItem.GameId);

            if (item.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }

            await cartItem.update({ 
                quantity: quantity,
                totalPrice: item.price * quantity
            });
            res.status(200).json({ message: 'Cart item updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        }
    },

    // Remove item from cart
    removeFromCart: async (req, res) => {
        try {
            const userId = req.user.userId; // Get user ID from authenticated user
            const { cartItemId } = req.params;

            const cartItem = await Cart.findOne({
                where: {
                    id: cartItemId,
                    UserId: userId
                }
            });

            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            await cartItem.destroy();
            res.status(200).json({ message: 'Item removed from cart successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        }
    },

    // Clear user's cart
    clearCart: async (req, res) => {
        try {
            const userId = req.user.userId; // Get user ID from authenticated user

            await Cart.destroy({
                where: { UserId: userId }
            });

            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        }
    }
};

module.exports = cartController; 