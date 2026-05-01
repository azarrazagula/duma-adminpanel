import axios from "axios";

const API_URL = `http://${window.location.hostname}:5001/api/admin`;

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/allcategories`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories",
    );
  }
};

export const createCategory = async (categoryData) => {
  try {
    // categoryData can be a name string or FormData if including image
    const config =
      categoryData instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
    const response = await axios.post(
      `${API_URL}/categories`,
      categoryData,
      config,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create category",
    );
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const config =
      categoryData instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
    const response = await axios.put(
      `${API_URL}/categories/${id}`,
      categoryData,
      config,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update category",
    );
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete category",
    );
  }
};
