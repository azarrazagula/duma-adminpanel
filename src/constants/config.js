const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("192.168.");
export const BASE_URL = isLocal
  ? `http://${window.location.hostname}:5001`
  : `https://duma-backend.onrender.com`;

export const API_BASE_URL = `${BASE_URL}/api/admin`;
export const IMAGE_BASE_URL = BASE_URL;

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,
  
  // Products
  ALL_PRODUCTS: `${API_BASE_URL}/allproducts`,
  ADD_PRODUCT: `${API_BASE_URL}/addproducts`,
  UPDATE_PRODUCT: `${API_BASE_URL}/updateproducts`,
  DELETE_PRODUCT: `${API_BASE_URL}/deleteproducts`,
  
  // Categories
  ALL_CATEGORIES: `${API_BASE_URL}/allcategories`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  
  // Orders
  ALL_ORDERS: `${API_BASE_URL}/orders`,
  ORDER_STATUS: `${API_BASE_URL}/orders`, // needs /:id/status
  PAYMENT_DETAILS: `${API_BASE_URL}/payments`, // needs /:paymentId
  
  // Customers
  ALL_CUSTOMERS: `${API_BASE_URL}/customers`,
  CUSTOMER_BLOCK: `${API_BASE_URL}/customers`, // needs /:id/block
};
