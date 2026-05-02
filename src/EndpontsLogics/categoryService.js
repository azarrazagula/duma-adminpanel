import axios from "axios";

const API_URL = `http://${window.location.hostname}:5001/api/admin`;

export const getAllCategories = async () => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/allcategories`, config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories",
    );
  }
};

export const createCategory = async (categoryData) => {
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
        ...(categoryData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    };
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
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
        ...(categoryData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    };
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
  const admin = JSON.parse(localStorage.getItem('adminUser'));
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete category",
    );
  }
};
