import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Addgame from './addgame'
import Addelectronic from './addelectronic'

function ProductList({setadminproduct}) {
    
    const navigate=useNavigate()
    const[games,setgames]=useState([])
    const[electronic,setelectronic]=useState([])
    const[products,setproducts]=useState([])
    const[search,setsearch]=useState("")
    const[addgamehidden,setaddgamehideen]=useState(true)
    const[addelectronicc,setaddelectronic]=useState(true)

    useEffect(()=>(async()=>{
        try {
  let data = await axios.get(`http://localhost:2080/api/electronics`)
            let datag = await axios.get(`http://localhost:2080/api/games`)
            let d = data.data.electronics.concat(datag.data)
            console.log(d);
            console.log(data.data.electronics);
            console.log(datag.data);
            setproducts(d)
            setgames(datag.data)
            setelectronic(data.data.electronics)

 } catch (error) {
            console.log(error)
        }
}),[])

//after search is the add
  return (
    
    <div className='produclist' >
        <input type="text" placeholder='Search' onChange={(e)=>setsearch(e.target.value)} />

        <div className='electronics'>
                <h1>electrincs</h1>
                <button onClick={()=>(setaddelectronic(!addelectronicc))}>add Electronic</button>
            <div hidden={addelectronicc}>
                <Addelectronic/>
            </div>
            <table>

                <tbody>


            <tr>
                <th>Name</th>
                <th>Id</th>
                <th>quantity</th>
                <th>price</th>
                <th>description</th>
            </tr>
            {electronic.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((el,i)=>(
            <tr key={i}>
                <th>{el.name}</th>
                <th>{el.id}</th>
                <th>{el.quantity}</th>
                <th>{el.price}</th>
                <th>{el.description}</th>
                <th><button onClick={async()=>{
                    try {
                        await axios.delete(`http://localhost:2080/api/electronics/${el.id}`)
                    } catch (error) {
                        
                    }
                }}>delete</button></th>
                <th><button onClick={()=>{
                    navigate(`/admin-product/${el.id}`)
                    setadminproduct(el)
            }}>update</button></th>
            </tr>
            ))}
                </tbody>
            </table>


        </div>
        <div className='games'>
            <h1>games</h1>
            <button onClick={()=>(setaddgamehideen(!addgamehidden))}>add Game</button>
            <div hidden={addgamehidden}>
                <Addgame/>
            </div>
        <table>
            <tbody>

            <tr>
                <th>Name</th>
                <th>Id</th>
                <th>quantity</th>
                <th>price</th>
                <th>description</th>
               
                
            </tr>
            {games.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((el,i)=>(
            <tr key={i}>
                <th>{el.name}</th>
                <th>{el.id}</th>
                <th>{el.quantity}</th>
                <th>{el.price}</th>
                <th>{el.description}</th>
                <th><button onClick={async()=>{
                    try {
                        await axios.delete(`http://localhost:2080/api/games/${el.id}`)
                    } catch (error) {
                        
                    }
                }}>delete</button></th>
                 <th><button onClick={()=>{
                    navigate(`/admin-product/${el.id}`)
                    setadminproduct(el)
            }}>update</button></th>
            </tr>
            ))}
            </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default ProductList
