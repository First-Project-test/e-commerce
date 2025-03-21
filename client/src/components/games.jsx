import React, { useEffect, useState } from 'react'
import Oneproduct from './Oneproduct'
import axios from 'axios'
function Games({setprod,cat}) {
        const [products,setproducts]=useState([])


    useEffect(()=>(async()=>{
        try {
          
            let d= await axios.get(`http://localhost:2080/api/games`)
            console.log(d);
            console.log("cat",cat);
            
            setproducts(d.data)
    
            

            // will be filtered later according to our needs

            
        } catch (error) {
            console.log(error)
        }
}),[])
  return (
    <div>
      {products.filter((e)=>e.ElectronicId===cat.id).map((el,i)=>(
        <div key={i}>
          <Oneproduct el={el} i={i} setprod={setprod} />
        </div>
      ))}
    </div>
  )
}

export default Games
