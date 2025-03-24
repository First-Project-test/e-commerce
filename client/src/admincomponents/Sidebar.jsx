import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({setisuserlist,setisproductlist}) {
    const navigate=useNavigate()
  return (
    <div className="sidebar-menu">
      <button 
        className="action-button"
        onClick={()=>navigate('/')}
      >
        Home
      </button>
      <button 
        className="action-button"
        onClick={()=>{
          setisproductlist(true)
          setisuserlist(false)
        }}
      >
        Users
      </button>
      <button 
        className="action-button"
        onClick={()=>{
          setisproductlist(false)
          setisuserlist(true)
        }}
      >
        Products
      </button>
    </div>
  )
}

export default Sidebar
