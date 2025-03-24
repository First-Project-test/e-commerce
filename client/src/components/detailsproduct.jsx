import React, { useState, useEffect } from 'react'
import '../css/DetailsProduct.css'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

function Detailsproduct() {
    const [currentimage, setCurrentImage] = useState(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const location = useLocation()

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true)
                const isGame = location.pathname.startsWith('/games/')
                const endpoint = isGame 
                    ? `http://localhost:2080/api/games/${id}`
                    : `http://localhost:2080/api/electronics/${id}`

                const response = await axios.get(endpoint)
                let productData = isGame ? response.data : response.data.electronics
                console.log('Raw product data:', productData)
                
                if (productData) {
                    // Handle both array and single object responses
                    if (Array.isArray(productData)) {
                        productData = productData.find(p => p.id === id) || productData[0]
                    }
                    
                    // Ensure image data is in the correct format
                    const formattedProduct = {
                        ...productData,
                        image: Array.isArray(productData.image) 
                            ? productData.image 
                            : productData.image ? [productData.image] : []
                    }
                    console.log('Formatted product:', formattedProduct)
                    setProduct(formattedProduct)
                    setCurrentImage(formattedProduct.image[0])
                } else {
                    setError('Product not found')
                }
            } catch (error) {
                console.error('Error fetching product:', error)
                setError('Failed to load product details')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProductData()
        }
    }, [id, location.pathname])

    useEffect(() => {
        // Set up image rotation only if we have product data with multiple images
        if (product?.image?.length > 1) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * product.image.length)
                setCurrentImage(product.image[randomIndex])
            }, 750)
        
            return () => clearInterval(interval)
        }
    }, [product])

    if (loading) {
        return (
            <div className="details-container">
                <div className="loading-spinner">Loading product details...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="details-container">
                <div className="error-message">{error}</div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="details-container">
                <div className="error-message">Product not found</div>
            </div>
        )
    }

    // Ensure we have a valid image URL
    const imageUrl = currentimage || product.image[0] || '/placeholder.jpg'
    console.log('Displaying image URL:', imageUrl)

    return (
        <div className="details-container">
            <div className="product-image">
                <img 
                    src={imageUrl}
                    alt={product.name}
                    className="main-image"
                    onError={(e) => {
                        console.error('Image failed to load:', e.target.src)
                        e.target.src = '/placeholder.jpg'
                    }}
                />
            </div>

            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                
                <div className="info-section price-section">
                    <p className="info-label">Price: ${product.price}</p>
                </div>

                <div className="info-section rating-section">
                    <p className="info-label">Rating: {product.rating ? `${product.rating}/5` : 'No rating available'}</p>
                </div>

                <div className="info-section description-section">
                    <p className="info-label">Description: {product.description || 'No description available'}</p>
                </div>

                <div className="info-section release-section">
                    <p className="info-label">Release Date: {product.release || 'Not specified'}</p>
                </div>

                <div className="info-section quantity-section">
                    <p className="info-label">Quantity Available: {product.quantity || 0}</p>
                </div>
            </div>
        </div>
    )
}

export default Detailsproduct
