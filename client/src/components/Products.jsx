import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Products({cat}) {
    const [products,setproducts]=useState([])

    useEffect(()=>(async()=>{
        try {
            let data = await axios.get(``)
            setproducts(data.data)
        } catch (error) {
            console.log(error)
            
        }
}),[])
  return (
    <div>
      {products.filter((e)=>e.categories.includes(cat)).map((el,i)=>(
        <OneProduct el={el} i={i} />
        //mazelt mosh aref oussema shnaya 5dem ma na3resh shanya data jeya w besh 
      ))}
    </div>
  )
}

export default Products
