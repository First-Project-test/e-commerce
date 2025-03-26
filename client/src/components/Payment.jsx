import React from 'react';
import '../css/Payment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const navigate = useNavigate();

    const items = JSON.parse(localStorage.getItem('items')); 

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/success');
    };

    return (
        <div className="payment-container">
            <div className="payment-header">
                <button className="close-btn" onClick={() => navigate(-1)}>×</button>
                <h2>Payment</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Card number"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <input
                            type="text"
                            placeholder="Exp. date"
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <input
                            type="text"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name on card"
                        required
                    />
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" />
                        Use shipping address as billing address
                    </label>
                </div>

                <button 
                onClick={async()=>{
                    const user = JSON.parse(localStorage.getItem('user'));
                    const token = localStorage.getItem('token');
                    
                    if (!token) {
                        alert('Please login to complete your purchase');
                        navigate('/login');
                        return;
                    }

                    try {
                        await axios.put('http://localhost:2080/api/users/', {
                            
                            cart: items

                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        navigate('/success');
                    } catch (error) {
                        console.error('Error creating order:', error);
                        alert(error.response?.data?.message || 'Failed to create order. Please try again.');
                    }
                }}
                type="submit" className="pay-now-btn">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment;
