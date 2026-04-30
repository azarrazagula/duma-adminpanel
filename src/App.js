import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useProducts } from "./hooks/useProducts";
import { isAdminAuthenticated } from "./EndpontsLogics/authService";
import "./styles/index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    products,
    loading,
    error,
    refreshProducts,
  } = useProducts();

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f4f7fe]">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0 md:ml-[260px]'}`}>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            toggleSidebar={toggleSidebar}
          />
          <section className="p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/dashboard" element={<Dashboard products={products} />} />
              
              <Route path="/products" element={
                <Products
                  filteredProducts={filteredProducts}
                  products={products}
                  loading={loading}
                  error={error}
                  refreshProducts={refreshProducts}
                />
              } />

              <Route path="/categories" element={<Categories products={products} />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/customers" element={<Customers />} />

              <Route path="/analytics" element={<Analytics products={products} />} />

              <Route path="/settings" element={<Settings />} />

              <Route path="/login" element={<Navigate to="/dashboard" replace />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
