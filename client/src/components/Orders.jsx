import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:2080/api/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, token, userId]);

  if (loading) {
    return <div className="orders-loading">Loading...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <p>You have no orders yet.</p>
        <button className="continue-shopping-btn" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Items</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.items.length}</td>
              <td>
                <button
                  className="view-details-btn"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;