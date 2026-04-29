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

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(ENDPOINTS.ADD_PRODUCT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add product');
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${ENDPOINTS.UPDATE_PRODUCT}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINTS.DELETE_PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};
