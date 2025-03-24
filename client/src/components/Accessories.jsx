import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import OneProduct from './Oneproduct'

function Accessories({setprod}) {
    const [products,setproducts]=useState([])


    useEffect(()=>(async()=>{
        try {
            let data = await axios.get(`http://localhost:2080/api/accessories`)
            setproducts(data.data)
        } catch (error) {
            console.log(error)
        }
    }),[])
  return (
    <div>
      {products.map((el,i)=>(
          <div key={i}>
              <OneProduct el={el} i={i} setprod={setprod} />
          </div>
      ))}
    </div>
  )
}

export default Accessories
