import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SuccessPage.css';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <img 
                src="https://img.freepik.com/vecteurs-premium/joystick-dessin-anime-mignon-pour-mascotte-icone_634248-78.jpg?w=826" 
                alt="Pink Tree" 
                className="success-icon"
            />
            <h2>Your Order is Confirmed!</h2>
            <p>Thank you for shopping with us! Your beautiful new furniture is on its way and will be ready to transform your space!</p>
            <button className="done-btn" onClick={() => navigate('/')}>
                Done
            </button>
        </div>
    );
};

export default SuccessPage; 