import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Oneproduct({el,i,setprod}) {
    const [cat,setcat]=useState
    const navigate=useNavigate()

  return (
    <div className='onecard' >
      <img src={el.image[Math.floor(Math.random()*el.image.length)]} 
      onClick={()=>{
        setprod(el) 
        // navigate to the detail page
        navigate('/products/:id')
      } } 
      
      alt="" />

        <h1   onClick={()=>{
          setprod(el)
        // navigate to the detail page
        navigate('/products/:id')
      } } >{el.name}</h1>
        <p>Price: ${el.price}</p>
        <p>Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}</p>


      <button onClick={
        async()=>{ try {
          let prd=el.id
          await axios.post(`http://localhost:3030/api/cart/add`,{prd})
            //post element to cart 
        } catch (error) {
            console.log(error)
        }  }
      }>add to cart</button>

      <button onClick={async()=>{
        try {
          await axios.delete(`http://localhost:3030/api/products/${el._id}`)
          window.location.reload()
        } catch (error) {
          console.log(error);
        }
      }}>delete</button>
    </div>
  )
}

export default Oneproduct
