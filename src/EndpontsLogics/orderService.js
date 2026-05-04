import axios from 'axios';
import { API_BASE_URL as API_URL } from '../constants/config';

export const getAllOrders = async () => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  const response = await axios.get(`${API_URL}/orders`, config);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  const response = await axios.put(`${API_URL}/orders/${id}/status`, { status }, config);
  return response.data;
};
export const getPaymentDetails = async (paymentId) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  const response = await axios.get(`${API_URL}/payments/${paymentId}`, config);
  return response.data;
};
