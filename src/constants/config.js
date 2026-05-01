export const API_BASE_URL = `http://${window.location.hostname}:5001/api/admin`;
export const ENDPOINTS = {
  ALL_PRODUCTS: `${API_BASE_URL}/allproducts`,
  ADD_PRODUCT: `${API_BASE_URL}/addproducts`,
  UPDATE_PRODUCT: `${API_BASE_URL}/updateproducts`,
  DELETE_PRODUCT: `${API_BASE_URL}/deleteproducts`,
};
