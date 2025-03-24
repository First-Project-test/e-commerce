import React, { useState, useEffect } from 'react'
import '../css/DetailsProduct.css'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

function Detailsproduct() {
    const [currentimage, setCurrentImage] = useState(null)
    const [product, setProduct] = useState(null)
    
    
    const productt =JSON.parse(localStorage.getItem("product"))

   

    useEffect(() => {
        // Set up image rotation only if we have product data with multiple images
        if (Array.isArray(productt.image) && productt.image.length > 1) {
       
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * productt.image.length)
                setCurrentImage(productt.image[randomIndex])
            }, 1000)
        
            return () => clearInterval(interval)
        }
        else{
            setCurrentImage(productt.image)
        }
    }, [])

   

    if (!productt) {
        return (
            <div className="details-container">
                <div className="error-message">Product not found</div>
            </div>
        )
    }

    // Ensure we have a valid image URL
    const imageUrl = currentimage||productt.image[0] 

    return (
        <div className="details-container">
            <div className="product-image">
                <img 
                    src={imageUrl}
                    alt={productt.name}
                    className="main-image"
                    
                />
            </div>

            <div className="product-info">
                <h1 className="product-title">{productt.name}</h1> 
                
                <div className="info-section price-section">
                    <p className="info-label">Price: ${productt.price}</p>
                </div>

                <div className="info-section rating-section">
                    <p className="info-label">Rating: {productt.rating ? `${productt.rating}/5` : 'No rating available'}</p>
                </div>

                <div className="info-section description-section">
                    <p className="info-label">Description: {productt.description || 'No description available'}</p>
                </div>

                <div className="info-section release-section">
                    <p className="info-label">Release Date: {productt.release || 'Not specified'}</p>
                </div>

                <div className="info-section quantity-section">
                    <p className="info-label">Quantity Available: {productt.quantity || 0}</p>
                </div>
            </div>
        </div>
    )
}

export default Detailsproduct