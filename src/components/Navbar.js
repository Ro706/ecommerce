import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.nav 
      className={`navbar ${theme}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <motion.span whileHover={{ scale: 1.1 }}>ShopEase</motion.span>
        </Link>
        
        <div className="nav-links">
          <Link to="/">
            <motion.button 
              className="nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button 
              className="nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
          </Link>
          <Link to="/contact">
            <motion.button 
              className="nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </Link>
        </div>
        
        <div className="nav-actions">
          <motion.button 
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>
          
          <Link to="/cart">
            <motion.button 
              className="cart-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </motion.button>
          </Link>
          
          {user ? (
            <motion.button 
              className="auth-btn"
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <Link to="/login">
              <motion.button 
                className="auth-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;