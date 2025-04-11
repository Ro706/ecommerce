import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { results = [], query = '' } = location.state || {};
  const { addToCart } = useContext(CartContext);

  return (
    <div className="search-results">
      <h2>Search Results for: <em>{query}</em></h2>

      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {results.map(product => (
            <div key={product.id} className="product-horizontal-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="category">Category: {product.category}</p>
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
