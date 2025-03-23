import React, { useState,useEffect } from 'react'
import '../css/DetailsProduct.css'

function Detailsproduct({el,i}) {
    const [currentimage,setCurrentImage]=useState(null)
    console.log(el.image[0]);
    
    

    useEffect(() => {
        // Set up an interval to change the image every 500ms (half second)
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * el.image.length);
          setCurrentImage(el.image[randomIndex]);
        }, 750);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, [el.image])

  return (
    <div className="details-container">
      <div className="product-image">
        <img src={currentimage} alt={el.name} className="main-image"/>
      </div>

      <div className="product-info">
        <h1 className="product-title">{el.name}</h1>
        
        <div className="info-section price-section">
          <p className="info-label">Price: ${el.price}</p>
        </div>

        <div className="info-section rating-section">
          <p className="info-label">Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}</p>
        </div>

        <div className="info-section description-section">
          <p className="info-label">Description: {el.description}</p>
        </div>

        <div className="info-section release-section">
          <p className="info-label">Release Date: {el.release || 'Not specified'}</p>
        </div>

        <div className="info-section quantity-section">
          <p className="info-label">Quantity Available: {el.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default Detailsproduct
