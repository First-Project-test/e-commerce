import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2 className="footer-logo">Game World</h2>
                    <nav className="footer-nav">
                        <Link to="/">Home</Link>
                        <span className="nav-separator">/</span>
                        <Link to="/about">About us</Link>
                    </nav>
                </div>

                <div className="footer-center">
                    <div className="contact-info">
                        <h3>CONTACT US</h3>
                        <a href="tel:+19998887654" className="phone">+1 999 888-76-54</a>
                    </div>
                    <div className="email-info">
                        <h3>EMAIL</h3>
                        <a href="mailto:gameworld@gmail.com">gameworld@gmail.com</a>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="address-info">
                        <h3>ADDRESS</h3>
                        <p>36 Rue Hassen Ibn Noomen , Gammarth, Tunis</p>
                    </div>
                    <div className="hours-info">
                        <h3>OPENING HOURS</h3>
                        <p>9am—6pm</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 — Copyright</p>
                <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ↑
                </button>
            </div>
        </footer>
    );
};

export default Footer; 