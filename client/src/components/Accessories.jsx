import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import OneProduct from './Oneproduct'
import '../css/Games.css'

function Accessories({setprod}) {
    const [products, setproducts] = useState([])

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await axios.get(`http://localhost:2080/api/accessories`)
                setproducts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAccessories()
    }, [])

    return (
        <div className="games-container">
            <div className="games-content">
                {products.map((el, i) => (
                    <div key={i}>
                        <OneProduct el={el} i={i} setprod={setprod} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Accessories
