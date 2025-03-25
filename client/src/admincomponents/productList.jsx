import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Addgame from './addgame'
import Addelectronic from './addelectronic'
import '../css/Dashboard.css'

function ProductList({setadminproduct}) {
    
    const navigate=useNavigate()
    const[games,setgames]=useState([])
    const[electronic,setelectronic]=useState([])
    const[products,setproducts]=useState([])
    const[search,setsearch]=useState("")
    const[addgamehidden,setaddgamehideen]=useState(true)
    const[addelectronicc,setaddelectronic]=useState(true)
    const[x,setx]=useState(false)

    useEffect(()=>(async()=>{
        try {
            let data = await axios.get(`http://localhost:2080/api/electronics`)
            let datag = await axios.get(`http://localhost:2080/api/games`)
            let d = data.data.electronics.concat(datag.data)
            setproducts(d)
            setgames(datag.data)
            setelectronic(data.data.electronics)
            
        } catch (error) {
            console.log(error)
        }
    }),[x])

    return (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1>Product Management</h1>
                <div className="search-container">
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            className="search-input"
                        />
                        <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2>Electronics</h2>
                    <button 
                        className="action-button"
                        onClick={()=>(setaddelectronic(!addelectronicc))}
                    >
                        Add Electronic
                    </button>
                </div>
                <div hidden={addelectronicc}>
                    <Addelectronic x={x}/>
                </div>
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Id</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {electronic.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((el,i)=>(
                                <tr key={i}>
                                    <td>
                                        <div className="product-image-cell">
                                            <img 
                                                src={el.image[0]} 
                                                alt={el.name}
                                                className="product-table-image"
                                            />
                                        </div>
                                    </td>
                                    <td>{el.name}</td>
                                    <td>{el.id}</td>
                                    <td>{el.quantity}</td>
                                    <td>${el.price}</td>
                                    <td>{el.description}</td>
                                    <td>
                                        <button 
                                            className="action-button delete"
                                            onClick={async()=>{
                                                const token = localStorage.getItem('token')
                                                try {
                                                    await axios.delete(`http://localhost:2080/api/electronics/${el.id}`, {
                                                        headers: {
                                                          Authorization: `Bearer ${token}`
                                                        }
                                                      })
                                                      setx(!x)
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="action-button"
                                            onClick={()=>{
                                                navigate(`/admin-product/${el.id}`)
                                                localStorage.setItem('product',JSON.stringify(el))
                                                setadminproduct(el)
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2>Games</h2>
                    <button 
                        className="action-button"
                        onClick={()=>(setaddgamehideen(!addgamehidden))}
                    >
                        Add Game
                    </button>
                </div>
                <div hidden={addgamehidden}>
                    <Addgame/>
                </div>
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Id</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((el,i)=>(
                                <tr key={i}>
                                    <td>
                                        <div className="product-image-cell">
                                            <img 
                                                src={el.image} 
                                                alt={el.name}
                                                className="product-table-image"
                                            />
                                        </div>
                                    </td>
                                    <td>{el.name}</td>
                                    <td>{el.id}</td>
                                    <td>{el.quantity}</td>
                                    <td>${el.price}</td>
                                    <td>{el.description}</td>
                                    <td>
                                        <button 
                                            className="action-button delete"
                                            onClick={async()=>{
                                                const token = localStorage.getItem('token')
                                                try {
                                                    await axios.delete(`http://localhost:2080/api/games/${el.id}`, {
                                                        headers: {
                                                          Authorization: `Bearer ${token}`
                                                        }
                                                      })
                                                      setx(!x)
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="action-button"
                                            onClick={()=>{
                                                navigate(`/admin-product/${el.id}`)
                                                localStorage.setItem('product',JSON.stringify(el))
                                                setadminproduct(el)
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList