import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockProducts = [
            { id: 1, name: 'Smartphone', price: 599.99, image: 'https://via.placeholder.com/150', category: 'electronics' },
            { id: 2, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/150', category: 'electronics' },
            { id: 3, name: 'Headphones', price: 149.99, image: 'https://via.placeholder.com/150', category: 'electronics' },
            { id: 4, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/150', category: 'electronics' },
            { id: 5, name: 'T-Shirt', price: 19.99, image: 'https://via.placeholder.com/150', category: 'clothing' },
            { id: 6, name: 'Jeans', price: 49.99, image: 'https://via.placeholder.com/150', category: 'clothing' },
            { id: 7, name: 'Running Shoes', price: 89.99, image: 'https://via.placeholder.com/150', category: 'footwear' },
            { id: 8, name: 'Backpack', price: 39.99, image: 'https://via.placeholder.com/150', category: 'accessories' },
            { id: 9, name: 'Sunglasses', price: 29.99, image: 'https://via.placeholder.com/150', category: 'accessories' },
          ];
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      getProductById,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};