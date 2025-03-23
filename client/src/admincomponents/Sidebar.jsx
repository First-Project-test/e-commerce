import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({setisuserlist,setisproductlist}) {
    const navigate=useNavigate()
  return (
    <div>
      <h3 onClick={()=>navigate('/')}>Home</h3>
      <h3 onClick={()=>{
        // navigate("user-list")
        setisproductlist(true)
          setisuserlist(false)
    }
        }>Users</h3>
      <h3 onClick={()=>{
          // navigate("/product-list")
          setisproductlist(false)
          setisuserlist(true)
      }
        }>Products</h3>
    </div>
  )
}

export default Sidebar
