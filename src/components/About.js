import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <motion.div 
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-container">
        <motion.h1
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          About ShopEase
        </motion.h1>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            ShopEase is your one-stop destination for all your shopping needs. 
            We offer a wide range of high-quality products at competitive prices.
          </p>
          <p>
            Our mission is to provide customers with a seamless shopping experience 
            with fast delivery, excellent customer service, and easy returns.
          </p>
          <motion.div 
            className="team-section"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Our Team</h2>
            <div className="team-members">
              {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'].map((member, index) => (
                <motion.div 
                  key={index}
                  className="team-member"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="member-avatar">{member.charAt(0)}</div>
                  <h3>{member}</h3>
                  <p>Position {index + 1}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;