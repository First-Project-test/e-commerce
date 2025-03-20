import React, { useState,useEffect } from 'react'

function Detailsproduct({el,i}) {
    const [currentimage,setCurrentImage]=useState(null)

    useEffect(() => {
        // Set up an interval to change the image every 500ms (half second)
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * el.image.length);
          setCurrentImage(el.image[randomIndex]);
        }, 750);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, [el.image]); 


  return (
    <div>
    <img src={currentimage} alt={el.name}/>

    <h1>{el.name}</h1>
    <p>Price: ${el.price}</p>
    <p>Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}</p>
    <p>Description: {el.description}</p>
    <p>Release Date: {el.release || 'Not specified'}</p>
    <p>Quantity Available: {el.quantity}</p>
  </div>
  )
}

export default Detailsproduct
