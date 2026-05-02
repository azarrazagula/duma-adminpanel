import axios from 'axios';

const API_URL = `http://${window.location.hostname}:5001/api/admin`;

export const getAllCustomers = async () => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/customers`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch customers');
  }
};

export const getCustomerDetails = async (id) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/customers/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch customer details');
  }
};

export const toggleBlockCustomer = async (id) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.put(`${API_URL}/customers/${id}/block`, {}, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update customer status');
  }
};

export const deleteCustomer = async (id) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.delete(`${API_URL}/customers/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete customer');
  }
};
