import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/DetailsProduct.css'

function Detailsproduct() {
    const el=JSON.parse(localStorage.getItem('product'))
    const [currentimage, setCurrentImage] = useState(null)
    const [rating, setrating] = useState(el.rating)
    const [price, setprice] = useState(el.price)
    const [description, setdescription] = useState(el.description)
    const [release, setrelease] = useState(el.release)
    const [quantity, setquantity] = useState(el.quantity)
    const [hidden, sethidden] = useState(true)
    const [hiddenprice, sethiddenprice] = useState(true)
    const [hiddenquantity, sethiddenquantity] = useState(true)
    const [hiddenrelease, sethiddenrelease] = useState(true)
    const [hiddendescription, sethiddendescription] = useState(true)
    const token = localStorage.getItem("token")


    useEffect(() => {
        if (el?.image?.length&&Array.isArray(el.image)) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * el.image.length)
                setCurrentImage(el.image[randomIndex])
            }, 750)

            return () => clearInterval(interval)
        }
        else{
            setCurrentImage(el.image)}
    }, [el.image])

    const handleUpdate = async (endpoint, data, setHidden) => {
        try {
            await axios.put(`http://localhost:2080/api/${endpoint}/${el.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setHidden(true)
        } catch (error) {
            if (error.response?.status === 404) {
                try {
                    await axios.put(`http://localhost:2080/api/games/${el.id}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setHidden(true)
                } catch (err) {
                    console.error(err)
                }
            } else {
                console.error(error)
            }
        }
    }

    return (
        <div className="details-container">
            <div className="product-image">
                <img 
                    src={currentimage || (el.image )
                        
                    } 
                    alt={currentimage} 
                    className="main-image"
                />

            </div>

            <div className="product-info">
                <h1 className="product-title">{el.name}</h1>

                <div className="info-section price-section">
                    <div className="info-label">
                        <span>Price: ${price}</span>
                        <button className="modify-btn" onClick={() => sethiddenprice(!hiddenprice)}>
                            {hiddenprice ? 'Modify' : 'Cancel'}
                        </button>
                    </div>
                    {!hiddenprice && (
                        <div className="edit-container">
                            <input
                                className="edit-input"
                                type="number"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                            <div className="button-group">
                                <button
                                    className="save-btn"
                                    onClick={() => handleUpdate('electronics', { price }, sethiddenprice)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-section rating-section">
                    <div className="info-label">
                        <span>Rating: {rating ? `${rating}/5` : 'No rating available'}</span>
                        <button className="modify-btn" onClick={() => sethidden(!hidden)}>
                            {hidden ? 'Modify' : 'Cancel'}
                        </button>
                    </div>
                    {!hidden && (
                        <div className="edit-container">
                            <input
                                className="edit-input"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={rating}
                                onChange={(e) => setrating(e.target.value)}
                            />
                            <div className="button-group">
                                <button
                                    className="save-btn"
                                    onClick={() => handleUpdate('electronics', { rating }, sethidden)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-section description-section">
                    <div className="info-label">
                        <span>Description: {description}</span>
                        <button className="modify-btn" onClick={() => sethiddendescription(!hiddendescription)}>
                            {hiddendescription ? 'Modify' : 'Cancel'}
                        </button>
                    </div>
                    {!hiddendescription && (
                        <div className="edit-container">
                            <textarea
                                className="edit-input"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                rows="3"
                            />
                            <div className="button-group">
                                <button
                                    className="save-btn"
                                    onClick={() => handleUpdate('electronics', { description }, sethiddendescription)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-section release-section">
                    <div className="info-label">
                        <span>Release Date: {release || 'Not specified'}</span>
                        <button className="modify-btn" onClick={() => sethiddenrelease(!hiddenrelease)}>
                            {hiddenrelease ? 'Modify' : 'Cancel'}
                        </button>
                    </div>
                    {!hiddenrelease && (
                        <div className="edit-container">
                            <input
                                className="edit-input"
                                type="date"
                                value={release}
                                onChange={(e) => setrelease(e.target.value)}
                            />
                            <div className="button-group">
                                <button
                                    className="save-btn"
                                    onClick={() => handleUpdate('electronics', { release }, sethiddenrelease)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-section quantity-section">
                    <div className="info-label">
                        <span>Quantity Available: {quantity}</span>
                        <button className="modify-btn" onClick={() => sethiddenquantity(!hiddenquantity)}>
                            {hiddenquantity ? 'Modify' : 'Cancel'}
                        </button>
                    </div>
                    {!hiddenquantity && (
                        <div className="edit-container">
                            <input
                                className="edit-input"
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => setquantity(e.target.value)}
                            />
                            <div className="button-group">
                                <button
                                    className="save-btn"
                                    onClick={() => handleUpdate('electronics', { quantity }, sethiddenquantity)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Detailsproduct