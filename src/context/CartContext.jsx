import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem('cartId'));

  const isAuthenticated = !!localStorage.getItem("token");

  const BASE_URL = 'https://farmera-abl8.onrender.com/api/v1/cart';

  useEffect(() => {
    if (cartId) {
      localStorage.setItem('cartId', cartId);
    }
  }, [cartId]);

  const fetchCart = async () => {
    if (!isAuthenticated && !cartId) {
      console.log('Skipping fetch: not authenticated and no cartId');
      return;
    }
 
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Content-Type': 'application/json',
      };
 
      const endpoint = isAuthenticated
        ? `${BASE_URL}/user`
        : `${BASE_URL}/guestUser`
      
      if (isAuthenticated) {
        if (!token) {
          console.log('Token not available yet, skipping fetch');
          return;
        }
        headers.Authorization = `Bearer ${token}`;
      } else {
        headers['x-cart-id'] = cartId;
      }

 
      const response = await axios.get(endpoint, {
        headers,
        withCredentials: true,
        timeout: 5000,
      });

      setCart(response.data);
    } catch (error) {
      console.error('Detailed error information:', {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request
      });

      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check your internet connection or try again later.');
      } else if (error.response) {
        setError(error.response.data?.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('Error setting up the request. Please try again.');
      }
    }
};
  
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated, cartId]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Content-Type': 'application/json',
      };
  
      const endpoint = isAuthenticated
        ? `${BASE_URL}/add`
        : `${BASE_URL}/guestAdd`;
      
      if (isAuthenticated) {
        if (!token) {
          console.log('Token not available yet, cannot add to cart');
          setError('Authentication token missing');
          setLoading(false);
          return false;
        }
        console.log('Adding to authenticated cart with token:', token);
        headers.Authorization = `Bearer ${token}`;
      } else {
        console.log('Adding to guest cart with cartId:', cartId);
        headers['x-cart-id'] = cartId;
      }
      
      console.log('Request headers:', headers);
      
      const response = await axios.post(
        endpoint,
        { products: [{ productId, quantity }] },
        { 
          headers, 
          withCredentials: true,
          timeout: 5000
        }
      );
      
      console.log('Received updated cart data:', response.data);
      setCart(response.data.cart || response.data);
      
      if (!isAuthenticated && response.data.cartId) {
        setCartId(response.data.cartId);
        localStorage.setItem('cartId', response.data.cartId);
      }
      
      return true;
    } catch (error) {
      console.error('Detailed error information:', {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request
      });
      
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check your internet connection or try again later.');
      } else if (error.response) {
        setError(error.response.data?.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('Error setting up the request. Please try again.');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (productId) => {
    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const endpoint = isAuthenticated 
        ? `${BASE_URL}/decrease`
        : `${BASE_URL}/guestDecrease`;

        console.log('Attempting to delete from endpoint:', endpoint);
        console.log('Current auth status:', { isAuthenticated, cartId });
 
      if (isAuthenticated) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      } else if (cartId) {
        headers['x-cart-id'] = cartId;
      }
 
      const response = await axios.patch(
        endpoint,
        { productId },
        { headers, withCredentials: true }
      );
 
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error decreasing quantity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const mergeCartsAfterLogin = async (token) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    console.log(cartId)
    
    try {
      const response = await axios.post(
        `${BASE_URL}/merge`,
        { cartId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      
      setCart(response.data.cart);
      
      localStorage.removeItem("cartId");
      setCartId(null);
      
      await fetchCart();
    } catch (error) {
      console.error("Error merging carts:", error);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Content-Type': 'application/json',
      };
      
      const endpoint = isAuthenticated
        ? `${BASE_URL}/delete`
        : `${BASE_URL}/guestDelete`;
      
      console.log('Attempting to delete from endpoint:', endpoint);
      console.log('Current auth status:', { isAuthenticated, cartId });
  
      if (isAuthenticated) {
        if (!token) {
          console.log('Token not available, cannot remove from cart');
          setError('Authentication token missing');
          setLoading(false);
          return false;
        }
        headers.Authorization = `Bearer ${token}`;
      } else if (cartId) {
        headers['x-cart-id'] = cartId;
      } else {
        console.log('No cartId available for guest user');
        setError('Cart session not initialized');
        setLoading(false);
        return false;
      }

      const response = await axios.delete(endpoint, {
        headers,
        data: { productId },
        withCredentials: true,
        timeout: 5000
      });
  
      console.log('Received updated cart data:', response.data);
      setCart(response.data.cart);
      return true;
    } catch (error) {
      console.error('Detailed error information:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else if (error.response) {
        setError(error.response.data?.error || `Server error: ${error.response.status}`);
      } else {
        setError('Error removing product from cart. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const clearCart = async () => {
    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
 
      const endpoint = isAuthenticated 
        ? `${BASE_URL}/clear`
        : `${BASE_URL}/guestClear`;

        console.log('Attempting to clear from endpoint:', endpoint);
        console.log('Current auth status:', { isAuthenticated, cartId });

      if (isAuthenticated) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      } else if (cartId) {
        headers['x-cart-id'] = cartId;
      }
 
      const response = await axios.delete(endpoint, {
        headers,
        withCredentials: true
      });
     
      setCart(response.data.cart);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Error clearing cart');
      return false;
    } finally {
      setLoading(false);
    }
};

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      fetchCart,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      mergeCartsAfterLogin
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};