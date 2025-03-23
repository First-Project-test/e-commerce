import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Cart.css';

const Cart = ({setprod}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      })
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
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:2080/api/cart/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh cart items after deletion
      fetchCartItems();
      console.log(cartItems);
      
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  }

  const handleViewDetails = (item) => {
    setprod(item.Game?item.Game:item.Electronic);
    navigate(`/products/${item.Game?item.Game.id:item.Electronic.id}`);
  }

  const calculateTotal =()=> {
    return cartItems.reduce((total,item)=>total+(item.price*item.quantity),0)
  }
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
            {cartItems.map((item,i) =>{console.log(item)
            return(
              <div key={i} className="cart-item">
                <div className="item-image">
                 {item.Game ? <img src={item.Game.image} alt={item.Game.name} />:<img src={item.Electronic.image} alt={item.Electronic.name} />}
                </div>
                <div className="item-details">
                  <h3>{item.Game?item.Game.name:item.Electronic.name}</h3>
                  <p className="item-price">${item.Game?item.Game.price:item.Electronic.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(item)}>
                    View Details
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            )})}
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
            <button onClick={()=> navigate("/payment")} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
      )
    }


    export default Cart