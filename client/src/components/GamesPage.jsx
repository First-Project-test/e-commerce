import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/GamesPage.css';
import Oneproduct from './Oneproduct';

const GamesPage = () => {
  const [categories, setCategories] = useState([])
  const [games, setGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories= await axios.get('http://localhost:2080/api/game-categories')
        const games= await axios.get('http://localhost:2080/api/games')
        setCategories(categories.data)
        setGames(games.data)
        setFilteredGames(games.data) 
      } catch (error) {
        console.error('Error',error)
      }
    }

    fetchData()
  }, [])

  // Handle category click to filter games
  const handleCategoryClick=(category) => {
    if (category === "all") {
      setFilteredGames(games)
    } else {
      const filtered = games.filter((game) => game.GameCategoryId === category.id)
      setFilteredGames(filtered) 
    }
  }

  return (
    <div className="games-page">
      {/* Categories Bar */}
      <section className="categories-bar">
        <div className="categories-container">
          {/* "All" button */}
          <button
            className="category-button"
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>

          {/* Dynamic category buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-button"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Games Display */}
      <section className="games-container">
        <div className="games-content">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <div key={index}>
                <Oneproduct el={game} i={index} />
              </div>
            ))
          ) : (
            <p>No games available.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default GamesPage