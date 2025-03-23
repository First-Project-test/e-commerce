import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'

const OneProduct = ({ el, i, setprod }) => {
  const navigate = useNavigate()
  console.log(el.image[1]);


  return (
    <div className="product-item">
      <img src={el.image[0]} alt={el.name} />
      <div className="content">
        <h3>{el.name}</h3>
        <p>{el.description}</p>
        <div className="price">${el.price}</div>
        <button onClick={() => {
          setprod(el)
          navigate(`/products/${i}`)
        }}>
           🛒 Add To Cart
        </button>
      </div>
    </div>
  )
}

export default OneProduct
