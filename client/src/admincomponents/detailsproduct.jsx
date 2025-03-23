import React, { useState,useEffect } from 'react'
import axios from 'axios'
import '../css/DetailsProduct.css'

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
    const token=localStorage.getItem("token")

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
    <div className="details-container">
        <div className="product-image">
            <img src={currentimage} alt={el.name} className="main-image"/>
        </div>

        <div className="product-info">
            <h1 className="product-title">{el.name}</h1>
            
            <div className="info-section price-section">
                <p className="info-label">Price: ${el.price}</p>
                <button className="modify-btn" onClick={()=>{sethiddenprice(!hiddenprice)}}>modify</button>
                <input 
                    className={`edit-input ${hiddenprice ? 'hidden' : ''}`}
                    hidden={hiddenprice} 
                    type="number" 
                    defaultValue={el.price} 
                    onChange={(e)=>{setprice(e.target.value)}}  
                />
                <button 
                    className="save-btn"
                    onClick={async()=>{
                        try {
                            await axios.put(`http://localhost:2080/api/electronics/${el._id}`,{price:price},{
                                headers: {
                                    Authorization: `Bearer ${token}`
                                  }
                            })
                            console.log(el.id);
                            
                            sethiddenprice(true)
                        } catch (error) {
                            if (error.status===404) {
                                
                            
                            try {
                            await axios.put(`http://localhost:2080/api/games/${el._id}`,{price:price})
                                
                            } catch (error) {
                                
                                console.log(error);
                            }
                        }
                        else{console.log(error);
                        }
                        }
                    }}
                >
                    save
                </button>
            </div>

            <div className="info-section rating-section">
                <p className="info-label">Rating: {el.rating ? `${el.rating}/5` : 'No rating available'}</p>
                <button className="modify-btn" onClick={()=>{sethidden(!hidden)}}>modify</button>
                <input 
                    className={`edit-input ${hidden ? 'hidden' : ''}`}
                    hidden={hidden} 
                    type="number" 
                    defaultValue={el.rating} 
                    onChange={(e)=>{setrating(e.target.value)}}  
                />
                <button 
                    className="save-btn"
                    onClick={async()=>{
                        try {
                            await axios.put(`http://localhost:2080/api/electronics/${el._id}`,{rating:rating})
                            sethidden(true)
                        } catch (error) {
                            if (error.status===404) {
                                
                            
                                try {
                                await axios.put(`http://localhost:2080/api/games/${el._id}`,{rating:rating})
                                    
                                } catch (error) {
                                    
                                    console.log(error);
                                }
                            }
                            else{console.log(error);
                            }
                        }
                    }}
                >
                    save
                </button>
            </div>

            <div className="info-section description-section">
                <p className="info-label">Description: {el.description}</p>
                <button className="modify-btn" onClick={()=>{sethiddendescription(!hiddendescription)}}>modify</button>
                <input 
                    className={`edit-input ${hiddendescription ? 'hidden' : ''}`}
                    hidden={hiddendescription} 
                    type="text" 
                    defaultValue={el.description} 
                    onChange={(e)=>{setdescription(e.target.value)}}  
                />
                <button 
                    className="save-btn"
                    onClick={async()=>{
                        try {
                            await axios.put(`http://localhost:2080/api/products/${el._id}`,{description:description})
                            sethiddendescription(true)
                        } catch (error) {
                            if (error.status===404) {
                                
                            
                                try {
                                await axios.put(`http://localhost:2080/api/games/${el._id}`,{description:description})
                                    
                                } catch (error) {
                                    
                                    console.log(error);
                                }
                            }
                            else{console.log(error);
                            }
                        }
                    }}
                >
                    save
                </button>
            </div>

            <div className="info-section release-section">
                <p className="info-label">Release Date: {el.release || 'Not specified'}</p>
                <button className="modify-btn" onClick={()=>{sethiddenrelease(!hiddenrelease)}}>modify</button>
                <input 
                    className={`edit-input ${hiddenrelease ? 'hidden' : ''}`}
                    hidden={hiddenrelease} 
                    type="date" 
                    defaultValue={el.release} 
                    onChange={(e)=>{setrelease(e.target.value)}}  
                />
                <button 
                    className="save-btn"
                    onClick={async()=>{
                        try {
                            await axios.put(`http://localhost:2080/api/products/${el._id}`,{release:release})
                            sethiddenrelease(true)
                        } catch (error) {
                            if (error.status===404) {
                                
                            
                                try {
                                await axios.put(`http://localhost:2080/api/games/${el._id}`,{release:release})
                                    
                                } catch (error) {
                                    
                                    console.log(error);
                                }
                            }
                            else{console.log(error);
                            }
                        }
                    }}
                >
                    save
                </button>
            </div>

            <div className="info-section quantity-section">
                <p className="info-label">Quantity Available: {el.quantity}</p>
                <button className="modify-btn" onClick={()=>{sethiddenquantity(!hiddenquantity)}}>modify</button>
                <input 
                    className={`edit-input ${hiddenquantity ? 'hidden' : ''}`}
                    hidden={hiddenquantity} 
                    type="number" 
                    defaultValue={el.quantity} 
                    onChange={(e)=>{setquantity(e.target.value)}}  
                />
                <button 
                    className="save-btn"
                    onClick={async()=>{
                        try {
                            await axios.put(`http://localhost:2080/api/products/${el._id}`,{quantity:quantity})
                            sethiddenquantity(true)
                        } catch (error) {
                            if (error.status===404) {
                                
                            
                                try {
                                await axios.put(`http://localhost:2080/api/games/${el._id}`,{quantity:quantity})
                                    
                                } catch (error) {
                                    
                                    console.log(error);
                                }
                            }
                            else{console.log(error);
                            }
                        }
                    }}
                >
                    save
                </button>
            </div>
        </div>
    </div>
  )
}

export default Detailsproduct
