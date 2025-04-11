import React, { useContext, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    navigate('/search', { state: { results: filtered, query: searchTerm } });
    setSearchTerm('');
  };

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

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className="nav-links">
          <Link to="/">
            <motion.button className="nav-link" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Home
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button className="nav-link" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              About
            </motion.button>
          </Link>
          <Link to="/contact">
            <motion.button className="nav-link" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
            title="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>

          <Link to="/cart">
            <motion.button 
              className="cart-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="View Cart"
            >
              🛒
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </motion.button>
          </Link>

          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <motion.button 
                className="auth-btn"
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
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
