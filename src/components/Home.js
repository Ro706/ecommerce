import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './Home.css';

const Home = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Slideshow data
  const slides = [
    {
      title: "Summer Sale!",
      subtitle: "Up to 50% off on selected items",
      cta: "Shop Now",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "New Arrivals",
      subtitle: "Discover our latest collection",
      cta: "Explore",
      bgColor: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)"
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50",
      cta: "Learn More",
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        title: "Limited Time Offer",
        subtitle: "Get 20% off on selected items",
        cta: "Shop Now",
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ];

  // Auto-rotate slides
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home">
      {/* Slideshow Hero Banner */}
      <div className="hero-slideshow">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: slide.bgColor }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              transition: { duration: 1 }
            }}
          >
            <div className="slide-content">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slide.subtitle}
              </motion.p>
              <Link to="/products">
                <motion.button
                  className="shop-now"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {slide.cta}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <motion.section 
        className="featured-products"
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.slice(0, 8).map((product) => (
            <motion.div 
              key={product.id}
              className="product-card"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <motion.button 
                    className="wishlist-btn"
                    onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isInWishlist(product.id) ? '❤️' : '🤍'}
                  </motion.button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <motion.button 
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;