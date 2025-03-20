

import Login from './login-and-signup/login';
import Signup from './login-and-signup/signup';
import Home from './components/Home';
import GamesPage from './components/GamesPage';
import './App.css';
// import axios from 'axios'
import Products from './components/Products.jsx';
import Detailsproduct from './components/detailsproduct.jsx'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

const App = () => {
  const [prod, setprod] = useState({});

  //


// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route 
            path="/games" 
            element={
              <ProtectedRoute>
                <GamesPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/products/:id" element={<Detailsproduct el={prod} />} />
          <Route path="/" element={<Products prod={prod} setprod={setprod} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

