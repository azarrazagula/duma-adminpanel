import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, LayoutDashboard, ShoppingCart, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ProductTable from '../components/dashboard/ProductTable';
import AddProductModal from '../components/dashboard/AddProductModal';
import EditProductModal from '../components/dashboard/EditProductModal';
import DeleteConfirmationModal from '../components/dashboard/DeleteConfirmationModal';
import { deleteProduct } from '../EndpontsLogics/productService';

const Dashboard = ({ products, filteredProducts, loading, error, refreshProducts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedProduct(products.find(p => p._id === id));
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    setDeleteLoading(true);
    try {
      await deleteProduct(selectedProduct._id);
      refreshProducts();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: <Package />, color: '#8b5cf6' },
    { label: 'Total Categories', value: [...new Set(products.map(p => p.category))].length, icon: <LayoutDashboard />, color: '#06b6d4' },
    { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, icon: <ShoppingCart />, color: '#ef4444' },
    { label: 'Avg. Price', value: `$${(products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)).toFixed(2)}`, icon: <Users />, color: '#10b981' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[32px] font-bold mb-2">Inventory Overview</h1>
          <p className="text-slate-secondary font-medium">Manage and monitor your product catalog with precision</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-accent-gradient text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent-primary/20"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </div>

      <ProductTable 
        products={filteredProducts} 
        loading={loading} 
        error={error} 
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={refreshProducts} 
      />

      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSuccess={refreshProducts} 
        product={selectedProduct}
      />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </motion.div>
  );
};

export default Dashboard;
