import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneProduct from './Oneproduct'
import '../css/Products.css'

function Products({setprod,cat}) {
  //oussema ye5dem l categories w baad on click on a category i get the prop cat 
  //with cat is the category name 
  //


    const [products,setproducts]=useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>(async()=>{
        try {
            setLoading(true)
            let data = await axios.get(`http://localhost:2080/api/electronics`)
            let datag = await axios.get(`http://localhost:2080/api/games`)
            let d = data.data.electronics.concat(datag.data)
            console.log(d);
            console.log(data.data.electronics);
            console.log(datag.data);
            setproducts(d)

            // will be filtered later according to our needs

            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }),[])

    if (loading) {
        return (
            <div className="products-container">
                <div className="loading-spinner">
                    Loading products...
                </div>
            </div>
        )
    }

    return (
        <div className="products-container">
            <div className="products-header">
                <h1 className="products-title">Manage Products</h1>
                <div className="products-filters">
                    <button className={`filter-button ${!cat ? 'active' : ''}`}>
                        All Products
                    </button>
                    <button className="filter-button">
                        Electronics
                    </button>
                    <button className="filter-button">
                        Games
                    </button>
                </div>
            </div>

            <div className="products-grid">
                {products.map((el,i) => (
                    <div key={i} className="product-item">
                        <OneProduct el={el} i={i} setprod={setprod} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
