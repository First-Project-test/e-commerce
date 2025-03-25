import React, { useEffect, useState } from 'react';
import '../css/NavBar.css';
import { useNavigate,Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate()

  const[hidedashboard,sethidedashboard]=useState(true)


  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{

    
    
    if(user&&user.role==='admin'){
    sethidedashboard(false)
  }
else{sethidedashboard(true)} },[user])

 

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">Game World</a>
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/shop">Shop</a>
       {/* <Link to="/games">Games</Link> */}
            <a className="nav-link" href="/categories">Categories</a>
            <a hidden={hidedashboard} className="nav-link" href="/Dashboard">Dashboard</a>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-link position-relative me-3">
              <i className="bi bi-cart"></i>
              <span hidden={!user} onClick={()=> navigate('/cart')} className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                🛒 
              </span>
            </button>
            <button className="btn-buy-now" onClick={() => navigate('/shop')}>
              Buy Now →
            </button>
            <button className="btn-buy-now" onClick={() => { 
              if(user){
                localStorage.removeItem('user')
                navigate('/')
              }
              else{
                navigate('/login')
              }
              }}>
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </nav>
  );
}

export default NavBar;


