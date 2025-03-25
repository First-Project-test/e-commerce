import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneProduct from './Oneproduct'
import '../css/Products.css'

function Products({setprod,cat}) {
    const [products,setproducts]=useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(()=>(async()=>{
        try {
            setLoading(true)
            let data = await axios.get(`http://localhost:2080/api/electronics`)
            let datag = await axios.get(`http://localhost:2080/api/games`)
            
            let d = data.data.electronics.concat(datag.data)
            console.log("prods",d);
            
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
                <h1 className="products-title">Our Products</h1>
                {/* <div className="search-container">
                    <input type="text" placeholder='search' onChange={(e)=>setSearch(e.target.value)} />
                </div> */}
                <div className="search-container">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Search products by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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

            <div className="products-grid">
                {products.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((el,i) => (
                    <div key={i} className="product-item">
                        <OneProduct el={el} i={i} setprod={setprod} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
