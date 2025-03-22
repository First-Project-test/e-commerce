import React, { useEffect, useState } from 'react'
import Oneproduct from './Oneproduct'
import axios from 'axios'
import '../css/Electronics.css'

function Electronics({setprod}) {

    const [products,setproducts]=useState([])
    useEffect(()=>(async()=>{
        try {
          
            let d= await axios.get(`http://localhost:2080/api/electronics`)
            console.log(d);
            setproducts(d.data.electronics)
            console.log("products",d.data.electronics);
            

            // will be filtered later according to our needs

            
        } catch (error) {
            console.log(error)
        }
}),[])
  return (
    <div className="electronics-container">
        <div className="electronics-content">
            {products.map((el,i)=>(
                <div key={i}>
                    <Oneproduct el={el} i={i} setprod={setprod} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Electronics
