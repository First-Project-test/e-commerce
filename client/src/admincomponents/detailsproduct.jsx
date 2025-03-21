import React, { useState,useEffect } from 'react'

function Detailsproduct({el,i}) {
    const [currentimage,setCurrentImage]=useState(null)
    const [rating,setrating]=useState(el.rating)
    const [price,setprice]=useState(el.price)
    const [description,setdescription]=useState(el.description)
    const [release,setrelease]=useState(el.release)
    const [quantity,setquantity]=useState(el.quantity)
    const [hidden,sethidden]=useState(true)
    const [hiddenprice,sethiddenprice]=useState(true)
    const [hiddenquantity,sethiddenquantity]=useState(true)
    const [hiddenrelease,sethiddenrelease]=useState(true)
    const [hiddendescription,sethiddendescription]=useState(true) 

    useEffect(() => {
      console.log(el.image);
      console.log("el.image");  
        // Set up an interval to change the image every 500ms (half second)
        const interval = setInterval(() => {
          
            const randomIndex = Math.floor(Math.random()*el.image.length);
            setCurrentImage(el.image[randomIndex]);
          
        }, 750);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, [el.image]); 


  return (
    <div>
    <img src={currentimage} alt={el.name}/>

    <h1>{el.name}</h1>
    <p>Price: ${el.price}
      <button onClick={()=>{sethiddenprice(!hiddenprice)}}>modify</button>
      <input hidden={hiddenprice} type="number" value={el.price} onChange={(e)=>{setprice(e.target.value)}}  />
      <button onClick={async()=>{try {
        await axios.put(`http://localhost:5000/api/products/${el._id}`,{price:price})
        sethiddenprice(true)
      } catch (error) {
        console.log(error);
      }}}>save</button>
    </p>
    <p>Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}
      <button onClick={()=>{sethidden(!hidden)}}>modify</button>
      <input hidden={hidden} type="number" value={el.rating} onChange={(e)=>{setrating(e.target.value)}}  />
      <button onClick={async()=>{try {
        await axios.put(`http://localhost:5000/api/products/${el._id}`,{rating:rating})
        sethidden(true)
      } catch (error) {
        console.log(error);
      }}}>save</button>
    </p>
    <p>Description: {el.description}
      <button onClick={()=>{sethiddendescription(!hiddendescription)}}>modify</button>
      <input hidden={hiddendescription} type="text" value={el.description} onChange={(e)=>{setdescription(e.target.value)}}  />
      <button onClick={async()=>{try {
        await axios.put(`http://localhost:5000/api/products/${el._id}`,{description:description})
        sethiddendescription(true)
      } catch (error) {
        console.log(error);
      }}}>save</button>
    </p>
    <p>Release Date: {el.release || 'Not specified'}
      <button onClick={()=>{sethiddenrelease(!hiddenrelease)}}>modify</button>
      <input hidden={hiddenrelease} type="date" value={el.release} onChange={(e)=>{setrelease(e.target.value)}}  />
      <button onClick={async()=>{try {
        await axios.put(`http://localhost:5000/api/products/${el._id}`,{release:release})
        sethiddenrelease(true)
      } catch (error) {
        console.log(error);
      }}}>save</button>
    </p>
    <p>Quantity Available: {el.quantity}
      <button onClick={()=>{sethiddenquantity(!hiddenquantity)}}>modify</button>
      <input hidden={hiddenquantity} type="number" value={el.quantity} onChange={(e)=>{setquantity(e.target.value)}}  />
      <button onClick={async()=>{try {
        await axios.put(`http://localhost:5000/api/products/${el._id}`,{quantity:quantity})
        sethiddenquantity(true)
      } catch (error) {
        console.log(error);
      }}}>save</button>
    </p>
  </div>
  )
}

export default Detailsproduct
