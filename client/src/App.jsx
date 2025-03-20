<<<<<<< HEAD
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import NavBar from './components/NavBar.jsx';
// // import HomePage from './components/HomePage';
// import Login from './login-and-signup/login';
// import Signup from './login-and-signup/signup';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <NavBar />
//         <Routes>
//           {/* <Route path="/Home" element={<Homepage />} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NavBar from "./components/NavBar.jsx"
// import HomePage from './components/HomePage';
import Login from "./login-and-signup/login"
import Signup from "./login-and-signup/signup"
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
=======
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

  return (

    <BrowserRouter>
>>>>>>> 0b2dff89dea994dcdadc815e52f67d5a336f53e1
        <Routes>
          {/* <Route path="/Home" element={<Homepage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
          <Route
            path="/shop"
            element={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh", fontSize: "2rem", color: "#666" }}
              >
                Shop 
              </div>
            }
          />
          <Route
            path="/categories"
            element={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh", fontSize: "2rem", color: "#666" }}
              >
                Categories
              </div>
            }
          />
          <Route
            path="/blog"
            element={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh", fontSize: "2rem", color: "#666" }}
              >
                Blog Page
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
=======
          <Route path="/products/:id" element={<Detailsproduct el={prod} />} />
          <Route path="/" element={<Products prod={prod} setprod={setprod} />} />
        </Routes>
    
    </BrowserRouter>
  );
>>>>>>> 0b2dff89dea994dcdadc815e52f67d5a336f53e1
}

export default App



