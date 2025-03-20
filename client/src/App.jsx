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
        <Routes>
          {/* <Route path="/Home" element={<Homepage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
}

export default App



