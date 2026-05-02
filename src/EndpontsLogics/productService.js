import axios from 'axios';
import { ENDPOINTS } from '../constants/config';

export const fetchAllProducts = async () => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.get(ENDPOINTS.ALL_PRODUCTS, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const createProduct = async (formData) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  try {
    const response = await axios.post(ENDPOINTS.ADD_PRODUCT, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${admin?.token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add product');
  }
};

export const updateProduct = async (id, formData) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  try {
    const response = await axios.put(`${ENDPOINTS.UPDATE_PRODUCT}/${id}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${admin?.token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.delete(`${ENDPOINTS.DELETE_PRODUCT}/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};
