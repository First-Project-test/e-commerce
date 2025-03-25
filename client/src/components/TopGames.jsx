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
  const user = JSON.parse(localStorage.getItem('user'))

  const sortGames = (games, option) => {
    return [...games].sort((a, b) => {
      if (option === 'price') return a.price - b.price
      if (option === 'rating') return b.rating - a.rating
      return 0
    })
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    const sorted = sortGames(games, e.target.value)
    setGames(sorted)
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:2080/api/games')
        const processedGames = response.data.map((game) => ({
          ...game,
          image: processGameImage(game.image),
        }))
        setGames(sortGames(processedGames, sortOption))
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchGames()
  }, [])

  const processGameImage = (image) => {
    if (!image) return '/placeholder.jpg'
    try {
      if (typeof image === 'string') {
        if (image.startsWith('[')) {
          const parsed = JSON.parse(image)
          return Array.isArray(parsed) ? parsed[0] : parsed
        }
        return image
      }
      return Array.isArray(image) ? image[0] : image
    } catch (e) {
      return '/placeholder.jpg'
    }
  }

  const handleAddToCart = async (game) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to add items to cart')
        navigate('/login')
        return
      }

      const response = await axios.post('http://localhost:2080/api/cart/add', {
        gameId: game.id || game._id,
        quantity: 1,
        role: 'game'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        alert('Game added to cart successfully!')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add game to cart. Please try again.')
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
                src={game.image}
                alt={game.name}
                className="game-image"
                onError={(e) => e.target.src = '/placeholder.jpg'}
              />
              <h2 className="game-title">{game.name}</h2>
              <p className="game-price">${game.price}</p>
              <p className="game-rating">⭐{game.rating}/5</p>
              <button 
                className="add-to-cart-btn"
                hidden={!user}
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