import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/TopGames.css'
import GameFAQ from './GameFAQ'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const TopGames = () => {
  const [games, setGames] = useState([])
  const [sortOption, setSortOption] = useState('rating')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:2080/api/games')
        console.log('Raw games data:', response.data)
        
        // Process images before setting games
        const processedGames = response.data.map(game => {
          console.log('Processing game:', {
            id: game.id,
            name: game.name,
            rawImage: game.image,
            imageType: typeof game.image
          });
          
          return {
            ...game,
            image: processGameImage(game.image)
          };
        });
        
        console.log('Processed games:', processedGames);
        setGames(processedGames)
      } catch (error) {
        console.error('Error fetching games:', error)
      }
    }

    fetchGames()
  }, [])

  // Helper function to process game images
  const processGameImage = (image) => {
    console.log('Processing image input:', image);
    
    if (!image) {
      console.log('No image provided, using placeholder');
      return '/placeholder.jpg';
    }
    
    try {
      // If image is a string that looks like an array, parse it
      if (typeof image === 'string') {
        console.log('Image is string:', image);
        if (image.startsWith('[')) {
          console.log('Attempting to parse JSON array');
          const parsed = JSON.parse(image);
          const result = Array.isArray(parsed) ? parsed[0] : parsed;
          console.log('Parsed result:', result);
          return result;
        }
        // If it's a URL string, return it directly
        return image;
      }
      
      // If image is already an array, take first image
      if (Array.isArray(image)) {
        console.log('Image is array:', image);
        return image[0];
      }
      
      // If image is a single string URL, use it directly
      console.log('Using image directly:', image);
      return image;
    } catch (e) {
      console.error('Error processing image:', e);
      return '/placeholder.jpg';
    }
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    const sortedGames = [...games].sort((a, b) => {
      if (e.target.value === 'price') return a.price - b.price
      if (e.target.value === 'rating') return b.rating - a.rating
      return 0
    })
    setGames(sortedGames)
  }

  const handleAddToCart = async (game) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to add items to cart')
        navigate('/login')
        return
      }

      console.log('Adding game to cart:', game); // Debug log

      const response = await axios.post('http://localhost:2080/api/cart/add', {
        gameId: game.id || game._id, // Handle both Sequelize and MongoDB ID formats
        quantity: 1,
        role: 'game' // Explicitly specify the role
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Game added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add game to cart. Please try again.';
      alert(errorMessage);
    }
  }

  return (
    <div className="top-games-page">
      <div className="top-games">
        <div className="header">
          <h1>Top Games</h1>
          <select className="sort-dropdown" value={sortOption} onChange={handleSortChange}>
            <option value="rating">Highest Rating</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>
        
        <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <img
                  src={game.image || '/placeholder.jpg'}
                  alt={game.name}
                  className="game-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <h2 className="game-title">{game.name}</h2>
                <p className="game-price">${game.price}</p>
                <p className="game-rating">⭐{game.rating}/5</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(game)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>

      <GameFAQ />
      <Footer />
    </div>
  )
}

export default TopGames