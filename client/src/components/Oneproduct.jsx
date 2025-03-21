import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Oneproduct({el,i,setprod}) {
    const navigate=useNavigate()
    console.log(el.id)

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
        <p>Rating: {el.rating ? `${el.rating/10}/10` : 'No rating available'}</p>
      <button onClick={
        
        async()=>{ try {
            let prd=el.id
            await axios.post(`http://localhost:2080/api/cart/add`,{prd})
            //post element to cart 
        } catch (error) {
            console.log(error)
        }  }
      }>add to cart</button>
    </div>
  )
}

export default Oneproduct
