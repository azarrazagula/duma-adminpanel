const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("192.168.29.128.3000");
export const BASE_URL = isLocal
  ? `http://${window.location.hostname}:5001`
  : `https://duma-backend.onrender.com`;

export const API_BASE_URL = `${BASE_URL}/api/admin`;
export const IMAGE_BASE_URL = BASE_URL;
export const ENDPOINTS = {
  ALL_PRODUCTS: `${API_BASE_URL}/allproducts`,
  ADD_PRODUCT: `${API_BASE_URL}/addproducts`,
  UPDATE_PRODUCT: `${API_BASE_URL}/updateproducts`,
  DELETE_PRODUCT: `${API_BASE_URL}/deleteproducts`,
};
