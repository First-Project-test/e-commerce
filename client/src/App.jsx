import React, { useState } from 'react';
import Login from './login-and-signup/login';
import Signup from './login-and-signup/signup';
import Home from './components/Home';
import GamesPage from './components/GamesPage';
import Games from './components/games.jsx';
import Electronics from './components/electronics.jsx';
import './App.css';
// import axios from 'axios'
import Products from './components/Products.jsx';
import Detailsproduct from './components/detailsproduct.jsx'
import TopGames from './components/TopGames.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [prod, setprod] = useState({});
  const [cat,setcat]=useState("")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>

        <Route path="/" element={
          <ProtectedRoute>
            <Home setcat={setcat} />
          </ProtectedRoute>
        } />
        <Route 
          path="/games" 
          element={
            <ProtectedRoute>
              <GamesPage setcat={setcat} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/top-games" 
          element={
            <ProtectedRoute>
              <TopGames />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } 
        />
        <Route path="/products/:id" element={<Detailsproduct el={prod} />} />
        <Route path="/shop" element={<Products prod={prod} setprod={setprod} cat={cat} />} />
        <Route path="/games/:id" element={<Games prod={prod} setprod={setprod} cat={cat} />} />
        <Route path="/electronics" element={<Electronics prod={prod} setprod={setprod} cat={cat} />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

