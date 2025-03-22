import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import UserList from './UserList'
import ProductList from './productList'
import Sidebar from './Sidebar'

function Dashboard({setadminproduct}) {
    const[isuserlist,setisuserlist]=useState(true)
    const[isproductlist,setisproductlist]=useState(true)
  return (
    <>
    <div className='side-bar'>
      <h1>sidebar</h1>
    <Sidebar setisproductlist={setisproductlist} setisuserlist={setisuserlist} />
    </div>
    <div hidden={isproductlist} >
        <ProductList setadminproduct={setadminproduct}/>
    </div>
    {/* <div hidden={isuserlist} >
        <UserList/>
    </div> */}
    
   
    </>
  )
}

export default Dashboard
