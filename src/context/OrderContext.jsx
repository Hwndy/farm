import axios from 'axios';

const BASE_URL = 'https://farmera-eyu3.onrender.com/api/v1/order';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const OrderContext = {
  createOrder: async (shippingAddress) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add`,
        { shippingAddress },
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create order' };
    }
  },

  getUserOrders: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: getAuthHeaders(),
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch user orders' };
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${orderId}`, {
        headers: getAuthHeaders(),
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch order' };
    }
  },

  returnProduct: async (orderId, orderedItemId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${orderId}/productId/${orderedItemId}/return`,
        {},
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to return product' };
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${orderId}/cancel`,
        {},
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to cancel order' };
    }
  },
};

export default OrderContext;
