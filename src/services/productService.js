import axios from 'axios';
import { ENDPOINTS } from '../constants/config';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(ENDPOINTS.ALL_PRODUCTS);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};
