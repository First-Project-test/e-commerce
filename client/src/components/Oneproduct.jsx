import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'

const OneProduct = ({ el, i, setprod }) => {
  const navigate = useNavigate()

  return (
    <div className="product-item">
      <img src={el.image} alt={el.name} />
      <div className="content">
        <h3>{el.name}</h3>
        <p>{el.description}</p>
        <div className="price">${el.price}</div>
        <button onClick={() => {
          setprod(el)
          navigate(`/products/${i}`)
        }}>
          View Details
        </button>
      </div>
    </div>
  )
}

export default OneProduct
