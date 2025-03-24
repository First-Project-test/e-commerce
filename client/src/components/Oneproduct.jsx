import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/OneProduct.css'
import axios from 'axios'

const OneProduct = ({ el, i, setprod }) => {
  const navigate = useNavigate()
  console.log(el.image[1]);

  const token=localStorage.getItem("token")


  return (
    <div className="product-item">
      <img onClick={() => {
          setprod(el)
          navigate(`/products/${i}`)
        }} src={el.image[0]} alt={el.name} />
      <div className="content">
        <h3 onClick={() => {
          setprod(el)
          navigate(`/products/${i}`)
        }}>{el.name}</h3>
        <p>{el.description}</p>
        <div className="price">${el.price}</div>
        <button onClick={async() => {
          if(el.role==="game"){
            await axios.post(`http://localhost:2080/api/cart/add`,{gameId:el.id},{
              headers: {
                Authorization: `Bearer ${token}`
              }
              
            })
            console.log(el.id)
            

          }
          if(el.role==="electronic"){
            await axios.post(`http://localhost:2080/api/cart/add`,{electronicsId:el.id},{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          }
          
        }}>

           🛒 Add To Cart

        </button>
      </div>
    </div>
  )
}

export default OneProduct
