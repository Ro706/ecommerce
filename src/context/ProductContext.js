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
            { id: 1, name: 'Smartphone', price: 599.99, image: 'https://th.bing.com/th/id/OIP.D0e7frWS_ymoflcNpS63XgHaHa?rs=1&pid=ImgDetMain', category: 'electronics' },
            { id: 2, name: 'Laptop', price: 999.99, image: 'https://i5.walmartimages.com/asr/2f5af5f8-e2d1-472c-a2c9-f0c36019ca6e_3.12778b2437c56c15f73bde71802de260.jpeg', category: 'electronics' },
            { id: 3, name: 'Headphones', price: 149.99, image: 'https://m.media-amazon.com/images/I/71AZkryvKIL._SL1500_.jpg', category: 'electronics' },
            { id: 4, name: 'Smart Watch', price: 199.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6280/6280405_sd.jpg', category: 'electronics' },
            { id: 5, name: 'T-Shirt', price: 19.99, image: 'https://th.bing.com/th/id/OIP.g-Wfqgj3Kc1oorH8GIz_oAHaKu?rs=1&pid=ImgDetMain', category: 'clothing' },
            { id: 6, name: 'Jeans', price: 49.99, image: 'https://i5.walmartimages.com/asr/713719fd-3995-489e-a566-07560e7a5d51_1.bdaefd5192c8c69ca9904c71bcc25e58.jpeg', category: 'clothing' },
            { id: 7, name: 'Running Shoes', price: 89.99, image: 'https://i5.walmartimages.com/asr/51a44ce2-16fa-4e7c-ab2a-c941d4644b79_1.9d9200b24b5fd8369c03b55a73caebfd.jpeg', category: 'footwear' },
            { id: 8, name: 'Backpack', price: 39.99, image: 'https://th.bing.com/th/id/OIP.UKI1aPzomCn50dGWwFr84gAAAA?rs=1&pid=ImgDetMain', category: 'accessories' },
            { id: 9, name: 'Sunglasses', price: 29.99, image: 'https://th.bing.com/th/id/OIP.DCkEMBB0wacmfxyD4YNC8wHaHa?rs=1&pid=ImgDetMain', category: 'accessories' },
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