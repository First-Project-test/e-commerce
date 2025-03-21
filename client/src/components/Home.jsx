import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';
import TopGames from './TopGames.jsx';

// Static categories data to match the design
const staticCategories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://thegadgetflow.com/wp-content/uploads/2021/02/New-PS5-and-Xbox-gadgets-for-gamers-featured.jpg'
  },
  {
    id: 2,
    name: 'Games',
    image: 'https://million-wallpapers.ru/wallpapers/4/73/337701050226466/lots-of-pictures-from-different-games.jpg'
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2024/08/perifericos-gaming-3860923.jpg?tf=3840x'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">Game World</a>
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/shop">Shop</a>
            <a className="nav-link" href="/categories">Categories</a>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-link position-relative me-3">
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <button className="btn-buy-now" onClick={() => navigate('/shop')}>
              Buy Now →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <div className="subtitle">GAMING STORE</div>
          <h1 className="hero-title">
          Discover the most advanced gaming consoles at Game World in Tunisia.
          </h1>
          <p className="hero-description">
          When looking at video games in general, we tend to find that visuospatial effects, like hand-eye coordination, and directed attention tend to get a little better when we're playing video games,” shares Dr. Austerman
          </p>
          <div className="hero-image">
            <img 
              src="https://idsb.tmgrup.com.tr/ly/uploads/images/2021/03/29/103616.jpg" 
              alt="Modern Gaming Setup"
              className="rounded-sofa"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-grid">
          {staticCategories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="category-content">
                <h2>{category.name}</h2>
                <button 
                  className="shop-now-btn" 
                  onClick={() => category.name === 'Games' ? navigate('/games') : navigate(`/category/${category.id}`)}
                >
                  Shop Now
                  <span className="arrow">→</span>
                </button>
              </div>
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
          ))}
        </div>
      </section>
      {/* Top Games Section */}
      <section className="top-games-section">
        <TopGames /> {/* Render TopGames component here */}
      </section>
    </div>
  );
};

export default Home; 