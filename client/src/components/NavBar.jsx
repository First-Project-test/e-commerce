import React, { useState } from 'react';
import '../css/NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate()
  const[hidedashboard,sethidedashboard]=useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">Game World</a>
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/shop">Shop</a>
            <a className="nav-link" href="/categories">Categories</a>
            <a hidden={hidedashboard} className="nav-link" href="/Dashboard">Dashboard</a>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-link position-relative me-3">
              <i className="bi bi-cart"></i>
              <span onClick={()=> navigate('/cart')} className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                🛒 
              </span>
            </button>
            <button className="btn-buy-now" onClick={() => navigate('/shop')}>
              Buy Now →
            </button>
          </div>
        </div>
      </nav>
  );
}

export default NavBar;


