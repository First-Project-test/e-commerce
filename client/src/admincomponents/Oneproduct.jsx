import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'

function Oneproduct({el,i,setprod}) {
    const [cat,setcat]=useState
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
        Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}
      </p>

      <div className='button-container'>
        <button 
          className='cart-button'
          onClick={async()=>{ 
            try {
              let prd=el.id
              await axios.post(`http://localhost:2080/api/cart/add`,{prd})
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Add to Cart
        </button>

        <button 
          className='delete-button'
          onClick={async()=>{
            try {
              await axios.delete(`http://localhost:2080/api/products/${el._id}`)
              window.location.reload()
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Oneproduct
