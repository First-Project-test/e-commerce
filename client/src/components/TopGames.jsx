import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/TopGames.css'
import GameFAQ from './GameFAQ'
import Footer from './Footer'

const TopGames = () => {
  const [games, setGames] = useState([])
  const [sortOption, setSortOption] = useState('rating') 

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:2080/api/games')
        console.log('Games data:',response.data)
        setGames(response.data)
      } catch (error) {
        console.error('Error fetching games:', error)
      }
    }

    fetchGames()
  },[])

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    const sortedGames = [...games].sort((a, b) => {
      if (e.target.value === 'price') return a.price - b.price
      if (e.target.value === 'rating') return b.rating - a.rating
      return 0
    })
    setGames(sortedGames)
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
                />
                <h2 className="game-title">{game.name}</h2>
                <p className="game-price">${game.price}</p>
                <p className="game-rating">⭐{game.rating}/5</p>
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