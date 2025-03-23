import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-header">
                <h1>About Game World</h1>
                <p className="subtitle">Your Ultimate Gaming Destination</p>
            </div>

            <div className="about-content">
                <section className="mission-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Game World, we're dedicated to creating an immersive gaming experience 
                        that brings together players from all walks of life. Our platform offers 
                        a carefully curated selection of games, ensuring quality and variety for 
                        our gaming community.
                    </p>
                </section>

                <section className="features-section">
                    <h2>What Sets Us Apart</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎮</div>
                            <h3>Curated Selection</h3>
                            <p>Hand-picked games ensuring quality and variety</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⭐</div>
                            <h3>Best Prices</h3>
                            <p>Competitive pricing and regular deals</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Platform</h3>
                            <p>Safe and reliable gaming experience</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤝</div>
                            <h3>24/7 Support</h3>
                            <p>Always here to help our gaming community</p>
                        </div>
                    </div>
                </section>

                <section className="team-section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">LT</div>
                            <h3>Louay Trablsi</h3>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">YT</div>
                            <h3>Yazid Tezi</h3>
                            <p>Head of Gaming</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">OC</div>
                            <h3>Oussama Chaaben</h3>
                            <p>Community Manager</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">N</div>
                            <h3>Nassira Gara</h3>
                            <p>Technical Director</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">RD</div>
                            <h3>Rayen Damdoum</h3>
                            <p>Creative Director</p>
                        </div>
                    </div>
                </section>

                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>1M+</h3>
                            <p>Active Gamers</p>
                        </div>
                        <div className="stat-item">
                            <h3>5000+</h3>
                            <p>Games Available</p>
                        </div>
                        <div className="stat-item">
                            <h3>24/7</h3>
                            <p>Support</p>
                        </div>
                        <div className="stat-item">
                            <h3>98%</h3>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                </section>

                <section className="contact-section">
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions or suggestions? We'd love to hear from you! 
                        Reach out to us at <a href="mailto:gameworld@gmail.com">gameworld@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs; 