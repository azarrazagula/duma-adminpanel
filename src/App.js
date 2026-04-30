import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
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
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/products" element={
                <Products
                  filteredProducts={filteredProducts}
                  products={products}
                  loading={loading}
                  error={error}
                  refreshProducts={refreshProducts}
                />
              } />

              <Route path="/orders" element={
                <Orders
                  filteredProducts={filteredProducts}
                  products={products}
                  loading={loading}
                  error={error}
                  refreshProducts={refreshProducts}
                />
              } />

              <Route path="/login" element={<Navigate to="/dashboard" replace />} />

              {/* Fallback for other tabs */}
              <Route path="*" element={
                <div className="text-center text-slate-500 mt-20">
                  <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                  <p>This section is under construction.</p>
                </div>
              } />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
