import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'

const OneProduct = ({ el, i, setprod }) => {
  const navigate = useNavigate()

  return (
    <div className="product-item">
      {el.image ? (
        <img src={el.image} alt={el.name} />
      ) : (
        <div className="placeholder-image">No Image</div>
      )}
      <div className="content">
        <h3>{el.name}</h3>
        <p>{el.description}</p>
        <div className="price">${el.price}</div>
        <button onClick={() => {
          setprod(el)
          navigate(`/products/${el.id || i}`)
        }}>
          View Details
        </button>
      </div>
    </div>
  )
}

export default OneProduct
