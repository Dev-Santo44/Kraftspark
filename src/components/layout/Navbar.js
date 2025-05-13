import "./../../assets/styles/Navbar.css";
import Logo from "./../../assets/images/logo.png";
import LoginButton from "./../common/LoginButton";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../hooks/useCart";

function Navbar() {
  const [user, setUser] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const isAdmin = user?.email === 'admin@example.com';

  return (
    <nav className="navbar shadow-md bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="logo flex items-center gap-3">
          <img
            src={Logo}
            alt="Kraft Spark"
            className="w-12 h-12 rounded-full border-2 border-purple-500"
          />
          <h1 className="text-2xl font-bold text-purple-700">Kraft Spark</h1>
        </div>

        <ul className="nav-links flex gap-6 text-gray-700 font-semibold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/wallet">Wallet</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          {isAdmin ?<li>
            <Link to="/admin">Admin Page</Link>
          </li>:""}
        </ul>

        <div className="nav-actions flex items-center gap-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <ShoppingCartIcon style={{ fontSize: 30, color: "#ffffff" }} />
                {cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="text-purple-600 font-medium hover:underline pfp"
              >
                P
              </Link>
            </>
          ) : (
            <LoginButton title="Log-in" desti="/login" />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
