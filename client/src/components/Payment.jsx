import React from 'react';
import '../css/Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

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

                <button type="submit" className="pay-now-btn">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment;
