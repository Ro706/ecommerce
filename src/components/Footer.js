import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEase</h3>
          <p>Your one-stop shop for all your needs.</p>
          <div className="social-links">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <i className={`fab fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            {['Home', 'About', 'Contact', 'Products'].map((link) => (
              <motion.li key={link} whileHover={{ x: 5 }}>
                <Link to={`/${link.toLowerCase()}`}>{link}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: contact@shopease.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Shopping St, Retail City</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ShopEase. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;