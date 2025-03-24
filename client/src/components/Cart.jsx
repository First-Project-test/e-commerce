import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Cart.css';

const Cart = ({setprod}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems()
    
  }, [])

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:2080/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Raw cart response:', response.data);
      setCartItems(response.data);
      
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart items');
    } finally {
      
      setLoading(false);
      
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setDeleteLoading(itemId);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to delete items');
        return;
      }

      const response = await axios.delete(`http://localhost:2080/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        alert('Item removed successfully');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      const errorMessage = error.response?.data?.message || 'Failed to remove item. Please try again.';
      alert(errorMessage);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleViewDetails = (item) => {
    console.log('Cart item:', item);
    const product = item.Game || item.Electronics;
    console.log('Product data:', product);
    if (!product) {
      alert('Product details not available');
      return;
    }
    
    // Determine the correct route based on the product type
    const route = item.Game ? `/games/${product.id}` : `/electronics/${product.id}`;
    navigate(route);
  }

  // Helper function to process images
  const processImage = (image) => {
    console.log('Processing cart image input:', image);
    
    if (!image) {
      console.log('No cart image provided, using placeholder');
      return '/placeholder.jpg';
    }
    
    try {
      // If image is a string that looks like an array, parse it
      if (typeof image === 'string') {
        console.log('Cart image is string:', image);
        if (image.startsWith('[')) {
          console.log('Attempting to parse JSON array');
          const parsed = JSON.parse(image);
          const result = Array.isArray(parsed) ? parsed[0]:parsed;
          console.log('Parsed result:', result);
          return result;
        }
        // If it's a URL string, return it directly
        return image;
      }
      
      // If image is already an array, take first image
      if (Array.isArray(image)) {
        console.log('Cart image is array:', image);
        return image[0];
      }
      
      // If image is a single string URL, use it directly
      console.log('Using cart image directly:', image);
      return image;
    } catch (e) {
      console.error('Error processing cart image:', e);
      return '/placeholder.jpg';
    }
  }

  const getItemDetails = (cartItem) => {
    console.log('Processing cart item:', cartItem);
    const product = cartItem.Game || cartItem.Electronics;
    console.log('Product from cart item:', product);
    
    if (!product) {
      console.log('No product found in cart item');
      return {
        id: cartItem.id,
        name: 'Unknown Product',
        price: 0,
        image: '/placeholder.jpg',
        quantity: cartItem.quantity || 0,
        totalPrice: cartItem.totalPrice || 0
      };
    }

    // Get the first image from the array or use the single image
    let imageUrl = '/placeholder.jpg';
    if (product.image) {
      if (Array.isArray(product.image)) {
        imageUrl = product.image[0];
      } else if (typeof product.image === 'string') {
        imageUrl = product.image;
      }
    }

    console.log('Using image URL:', imageUrl);

    return {
      id: cartItem.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      quantity: cartItem.quantity || 0,
      totalPrice: cartItem.totalPrice || 0
    };
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.totalPrice || 0), 0);
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} items in your cart</p>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((cartItem) => {
              const item = getItemDetails(cartItem);
              return (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-total">Total: ${item.totalPrice}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(cartItem)}
                    >
                      View Details
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={deleteLoading === item.id}
                    >
                      {deleteLoading === item.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button onClick={() => navigate("/payment")} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;