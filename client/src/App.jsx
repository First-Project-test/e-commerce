import React, { useState } from 'react';

import Login from './login-and-signup/login';
import Signup from './login-and-signup/signup';
import './App.css';
// import axios from 'axios'
import Products from './components/Products.jsx';
import Detailsproduct from './components/detailsproduct.jsx'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

const App = () => {
  const [prod, setprod] = useState({});

  //

  return (

    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:id" element={<Detailsproduct el={prod} />} />
          <Route path="/" element={<Products prod={prod} setprod={setprod} />} />
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
