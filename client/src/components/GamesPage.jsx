import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GamesPage.css';

const gamePlatforms = [
  {
    id: 1,
    name: 'Xbox Series X|S',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11e62ffb-3ee1-4d8c-b2b0-fa9fba112532/de18ox3-cac831a9-670c-46ab-b61f-b58faf174c64.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExZTYyZmZiLTNlZTEtNGQ4Yy1iMmIwLWZhOWZiYTExMjUzMlwvZGUxOG94My1jYWM4MzFhOS02NzBjLTQ2YWItYjYxZi1iNThmYWYxNzRjNjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.KbvaXeApnBR1tnNk4hclEiRELJyp01wOeRgFusS_leM',
    description: 'Experience next-gen gaming with Xbox Series X|S'
  },
  {
    id: 2,
    name: 'PlayStation 5',
    image: 'https://e0.pxfuel.com/wallpapers/999/857/desktop-wallpaper-best-ps5-games-7-you-need-to-play-on-playstation-5-ps-5-games.jpg',
    description: 'Dive into the future of gaming with PS5'
  },
  {
    id: 3,
    name: 'PlayStation 4',
    image: 'https://wallpapers.com/images/hd/cool-ps4-profile-pictures-1920-x-1080-j3n22l8gqr5ehqyp.jpg',
    description: 'Classic gaming experience with PS4'
  },
  {
    id: 4,
    name: 'Nintendo Switch',
    image: 'https://wallpaperaccess.com/full/1513438.jpg',
    description: 'Play anywhere, anytime with Nintendo Switch'
  }
];

const GamesPage = ({setcat}) => {
  const navigate = useNavigate();

  return (
    <div className="games-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <h1>Gaming Platforms</h1>
          <p>Choose your preferred games and explore our collections</p>
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="platforms-section">
        <div className="container">
          <div className="platforms-grid">
            {gamePlatforms.map((platform) => (
              <div key={platform.id} className="platform-card" onClick={() => {
                setcat(platform)
                
                navigate(`/games/${platform.id}`)}}>
                <div className="platform-image">
                  <img src={platform.image} alt={platform.name} />
                </div>
                <div className="platform-content">
                  <h2>{platform.name}</h2>
                  <p>{platform.description}</p>
                  <button className="explore-btn">
                      Explore Games
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamesPage; 