import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';
import TopGames from './TopGames.jsx';

const categories = [
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

const carouselImages = [
  {
    src: 'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png',
    alt: 'Xbox Series X'
  },
  {
    src: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
    alt: 'PlayStation 5'
  },
  {
    src: 'https://pixelz.cc/wp-content/uploads/2018/06/nintendo-switch-handheld-console-uhd-4k-wallpaper..jpg',
    alt: 'Nintendo Switch'
  },
  {
    src: 'https://gameszone.tn/494-large_default/xbox-series-s-digital-edition-console-tunisie.jpg',
    alt: 'xBox Series S'
  },
  {
    src: 'https://i5.walmartimages.com/seo/Sony-PlayStation-4-Limited-Edition-game-console-HDR-1-TB-HDD-gold_550d58ac-1b7c-4459-8d23-e23fd4b6f8e2_1.f50649af449335c03d864a4744bceee1.jpeg',
    alt: 'Playstation 4'
  }
];

const Home = ({setcat}) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [previousImage, setPreviousImage] = useState(carouselImages.length - 1);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousImage(currentImage);
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  return (
    <div className="main-container">
      <section className="hero-section">
        <div className="container text-center">
          <div className="subtitle">GAMING STORE</div>
          <h1 className="hero-title">
            Discover the most advanced gaming consoles at Game World in Tunisia.
          </h1>
          <p className="hero-description">
            When looking at video games in general, we tend to find that visuospatial effects, like hand-eye coordination, and directed attention tend to get a little better when we're playing video games," shares Dr. Austerman
          </p>
          <div className="simple-carousel">
            <div className="carousel-container">
              {carouselImages.map((image, index) => (
                <img 
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`carousel-img ${
                    index === currentImage ? 'active' : 
                    index === previousImage ? 'previous' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section hidden={!user} className="categories-section">
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="category-content">
                <h2>{category.name}</h2>  
                <button 
                  className="shop-now-btn" 
                  onClick={() => {
                    if (category.name === 'Games') {
                      navigate('/games');
                    } else if (category.name === 'Accessories') {
                      navigate('/accessories');
                    } else {
                      navigate('/electronics');
                    }
                    setcat(category.id);
                  }}
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
      <section hidden={!user} className="top-games-section">
        <TopGames />
      </section>
    </div>
  );
};

export default Home;