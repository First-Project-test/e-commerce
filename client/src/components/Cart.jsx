import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Cart.css';

const Cart = () => {
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
      // console.log('Raw cart response:', response.data);
      setCartItems(response.data);
      console.log("items",response.data)
      
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
   
      const response = await axios.delete(`http://localhost:2080/api/cart/`, {
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
            {cartItems.map((item) => {
              console.log("image",item.Game?item.Game.image:item.Electronic.image);
              
              return (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.Game?item.Game.image:item.Electronic.image} 
                      alt={item.Game?item.Game.name:item.Electronic.name} 
                     
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.Game?item.Game.name:item.Electronic.name}</h3>
                    <p className="item-price">${item.Game?item.Game.price:item.Electronic.price}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-total">Total: ${item.totalPrice}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="view-details-btn"
                     
                      onClick={() =>{
                        localStorage.setItem("product", JSON.stringify(item.Game?item.Game:item.Electronic))
                        navigate(`/product/${item.Game?item.Game.id:item.Electronic.id}`)} }
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
            <button onClick={() => {
              localStorage.setItem("items", JSON.stringify(cartItems))
              navigate("/payment")}} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;