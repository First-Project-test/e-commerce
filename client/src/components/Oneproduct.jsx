import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'

function Oneproduct({el,i,setprod}) {
    const navigate=useNavigate()

  return (
    <div className='onecard'>
      <img 
        className='product-image'
        src={el.image[Math.floor(Math.random()*el.image.length)]} 
        onClick={()=>{
          setprod(el)
          navigate('/products/:id')
        }}
        alt={el.name} 
      />

      <h1 
        className='product-title'
        onClick={()=>{
          setprod(el)
          navigate('/products/:id')
        }}
      >
        {el.name}
      </h1>

      <p className='product-info product-price'>Price: ${el.price}</p>
      <p className='product-info product-rating'>
        Rating: {el.rating ? `${el.rating/10}/10` : 'No rating available'}
      </p>

      <div className='button-container'>
        <button 
          className='cart-button'
          onClick={async()=>{ 
            try {
              let prd=el.id
              await axios.post(`http://localhost:2080/api/cart/add`,{GameID:prd})
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Oneproduct
