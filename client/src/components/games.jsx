import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Oneproduct from './Oneproduct';
import axios from 'axios';
import '../css/Games.css';

function Games({setprod}) {
  const { categoryId } = useParams()
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
        try {
        let response
        if (categoryId) {
          response = await axios.get(`http://localhost:2080/api/games/category/${categoryId}`)
        } else {
          response = await axios.get(`http://localhost:2080/api/games`)
        }
        // console.log("Games data:",response.data)
        setGames(response.data)
      } catch (error) {
        console.error('Error',error)
      }
    }

    fetchGames()
  },[categoryId])

  return (
    <div className="games-container">
      <div className="games-content">
        {games.map((el, i) => (
          <div key={i}>
            <Oneproduct el={el} i={i} setprod={setprod} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Games
