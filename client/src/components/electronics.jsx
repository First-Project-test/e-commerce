import React, { useEffect, useState } from 'react'
import Oneproduct from './Oneproduct'
import axios from 'axios'

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
    <div>
      {products.map((el,i)=>(
        <div key={i}>
          <Oneproduct el={el} i={i} setprod={setprod} />
        </div>

        //mazelt mosh aref oussema shnaya 5dem ma na3resh shanya data jeya w besh 
      ))}
    </div>
  )
}

export default Electronics
