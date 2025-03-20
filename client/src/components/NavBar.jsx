import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand logo">GAME WORLD</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">Shop</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
              <Link to="/Games" className="nav-link">Games</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


