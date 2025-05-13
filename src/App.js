import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import Wallet from './pages/Wallet';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './hooks/useCart'; // ✅ Import the CartProvider

import { auth } from './services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AdminPage from './pages/AdminPage';
import { Navigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
function App() {

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'admin@example.com';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: "/store",
      element: <><Navbar /><Store /></>
    },
    {
      path: "/wallet",
      element: <><Navbar /><Wallet /></>
    },
    {
      path: "/orders",
      element: <><Navbar /><Orders /></>
    },
    {
      path: "login",
      element: <><Navbar /><Login /></>
    },
    {
      path: "/profile",
      element: <><Navbar /><Profile /></>
    },
    {
      path: "/cart",
      element: <><Navbar /><Cart /></>
    },
    {
      path: '/admin',
      element: checkingAuth ? null : (isAdmin ? <><Navbar /><AdminPage /></> : <Navigate to="/login" />),
    },
  ]);

  return (
    <div className="App">
      
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </div>
  );
}

export default App;
