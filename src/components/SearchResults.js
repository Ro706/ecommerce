import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { results = [], query = '' } = location.state || {};

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {results.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
