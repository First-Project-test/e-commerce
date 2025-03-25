import React, { useState } from 'react';
import Login from './login-and-signup/login';
import Signup from './login-and-signup/signup';
import Home from './components/Home';
import GamesPage from './components/GamesPage.jsx';
import Games from './components/games.jsx';
import Electronics from './components/electronics.jsx';
import AboutUs from './components/AboutUs';
import './App.css';
// import axios from 'axios'
import Products from './components/Products.jsx';
import Detailsproduct from './components/detailsproduct.jsx'
import TopGames from './components/TopGames.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Dashboard from './admincomponents/Dashboard.jsx';
import UserList from './admincomponents/UserList.jsx';
import ProductList from './admincomponents/productList.jsx';
import Detailsproducts from './admincomponents/detailsproduct.jsx'
import Accessories from './components/Accessories.jsx';

import Payment from './components/Payment.jsx';
import SuccessPage from './components/SuccessPage.jsx';

import Cart from './components/Cart.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return children
}

const App = () => {
  const [prod, setprod] = useState({})
  const [cat,setcat]=useState("")
  const [adminproduct,setadminproduct]=useState({})
  console.log("prod",prod);
  
  
  

  return (
  
    <BrowserRouter>
    <ScrollToTop/>
    <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>

        <Route path="/" element={
          
            <Home setcat={setcat} />
          
        } />
        <Route 
          path="/games" 
          element={
            
              <GamesPage setcat={setcat} />
            
          } 
        />
        <Route 
          path="/top-games" 
          element={
            
              <TopGames />
            
          } 
        />
        <Route 
          path="/about" 
          element={
            
              <AboutUs />
            
          } 
        />
        <Route path="/products/:id" element={<Detailsproduct el={prod} />} />
        <Route path="/shop" element={<Products prod={prod} setprod={setprod} cat={cat} />} />
        <Route path="/games/:id" element={<Detailsproduct />} />
        <Route path="/product/:id" element={<Detailsproduct />} />
        <Route path="/electronics" element={<Electronics prod={prod} setprod={setprod} cat={cat} />} />
        <Route path="/accessories" element={<Accessories  setprod={setprod}  />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/Dashboard/" element={<Dashboard setadminproduct={setadminproduct} />} >
        
        <Route path="user-list" element={<UserList  />} />
        </Route>
        <Route path="/cart/" element={<Cart setprod={setprod} /> } />
        <Route path="/product-list" element={<ProductList  />} />

        <Route path='/admin-product/:id' element={<Detailsproducts el={adminproduct}/>}/>
       


      </Routes>
    </BrowserRouter>
  )
}

export default App;

