import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  const placeOrder = (shippingInfo) => {
    const newOrder = {
      id: Date.now(),
      userId: user?.id || 'guest',
      items: cartItems,
      total: cartTotal,
      shippingInfo,
      status: 'processing',
      date: new Date().toISOString()
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      getOrderById,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};