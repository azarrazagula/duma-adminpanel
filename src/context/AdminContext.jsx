import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllProducts } from '../EndpontsLogics/productService';
import { getAllOrders } from '../EndpontsLogics/orderService';
import { getAllCategories } from '../EndpontsLogics/categoryService';
import { getAllCustomers } from '../EndpontsLogics/customerService';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = async () => {
    try {
      // Only show global loading if we don't have data yet
      if (products.length === 0 && orders.length === 0) {
        setLoading(true);
      }
      
      const [productsData, ordersData, categoriesData, customersData] = await Promise.all([
        fetchAllProducts(),
        getAllOrders(),
        getAllCategories(),
        getAllCustomers()
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setCategories(categoriesData);
      setCustomers(customersData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    refreshData();
  }, []);

  const value = {
    products,
    setProducts,
    orders,
    setOrders,
    categories,
    setCategories,
    customers,
    setCustomers,
    loading,
    error,
    refreshData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
