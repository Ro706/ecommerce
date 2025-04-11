import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <motion.div 
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="not-found-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.h1
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          404
        </motion.h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back Home
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;