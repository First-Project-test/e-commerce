import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'
import axios from 'axios'

const OneProduct = ({ el, i, setprod }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(el.role);
  

  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert('Please login to add items to cart')
        navigate('/login')
        return
      }

      setLoading(true)
      const payload = el.role === "game" 
        ? { gameId: el.id }
        : { electronicsId: el.id }

      const response = await axios.post(
        `http://localhost:2080/api/cart/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        alert('Item added to cart successfully!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart. Please try again.'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-item">
      <img 
        onClick={() => {
          setprod(el)
          localStorage.setItem("product", JSON.stringify(el))
          navigate(`/products/${i}`)
        }} 
        src={Array.isArray(el.image) ? el.image[0] : el.image} 
        alt={el.name} 
      />
      <div className="content">
        <h3 
          onClick={() => {
            localStorage.setItem("product", JSON.stringify(el))
            
            navigate(`/products/${i}`)
          }}
        >
          {el.name}
        </h3>
        <p>{el.description}</p>
        <div className="price">${el.price}</div>
        <button 
          onClick={handleAddToCart}
          hidden={!user}
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Adding...' : '🛒 Add To Cart'}
        </button>
      </div>
    </div>
  )
}

export default OneProduct