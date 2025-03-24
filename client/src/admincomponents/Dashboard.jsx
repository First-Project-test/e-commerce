import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import UserList from './UserList'
import ProductList from './productList'
import Sidebar from './Sidebar'
import '../css/Dashboard.css'

function Dashboard({setadminproduct}) {
    const[isuserlist,setisuserlist]=useState(true)
    const[isproductlist,setisproductlist]=useState(true)
  return (
    <div className="dashboard-page">
      <div className="side-bar">
        <h1>Admin Dashboard</h1>
        <Sidebar setisproductlist={setisproductlist} setisuserlist={setisuserlist} />
      </div>
      <div className="dashboard-content">
        <div hidden={isproductlist}>
          <ProductList setadminproduct={setadminproduct}/>
        </div>
        <div hidden={isuserlist}>
          <UserList/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
