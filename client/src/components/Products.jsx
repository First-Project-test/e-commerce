import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneProduct from './Oneproduct'
import '../css/Products.css'

function Products({setprod,cat}) {
    const [products,setproducts]=useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>(async()=>{
        try {
            setLoading(true)
            let data = await axios.get(`http://localhost:2080/api/electronics`)
            let datag = await axios.get(`http://localhost:2080/api/games`)
            data.data.electronics["role"]="electronic"
            datag.data["role"]="game"
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
                <h1 className="products-title">Our Products</h1>
                <div className="products-filters">
                    {/* <button className={`filter-button ${!cat ? 'active' : ''}`}>
                        All Products
                    </button> */}
                    {/* Add more filter buttons as needed */}
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
