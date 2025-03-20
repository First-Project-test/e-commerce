import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Oneproduct({el,i,setprod}) {
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
            await axios.post(``)
            //post element to cart 
        } catch (error) {
            console.log(error)
        }  }
      }>add to cart</button>
    </div>
  )
}

export default Oneproduct
