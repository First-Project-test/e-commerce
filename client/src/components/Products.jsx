import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneProduct from './Oneproduct'

function Products({setprod,cat}) {
  //oussema ye5dem l categories w baad on click on a category i get the prop cat 
  //with cat is the category name 
  //
    const [products,setproducts]=useState([])

    useEffect(()=>(async()=>{
        try {
            let data = await axios.get(`http://localhost:3030/api/electronics`)
            let datag= await axios.get(`http://localhost:3030/api/games`)
            let d=data.data.electronics.concat(datag.data)
            console.log(d);
            
            console.log(data.data.electronics);
            console.log(datag.data);
            setproducts(d)

            // will be filtered later according to our needs


        } catch (error) {
            console.log(error)
        }
}),[])
  return (
    <div>
      {products.map((el,i)=>(

        <div key={i}>
          <OneProduct el={el} i={i} setprod={setprod}  />
        </div>
        //mazelt mosh aref oussema shnaya 5dem ma na3resh shanya data jeya w besh 
      ))}
    </div>
  )
}

export default Products
