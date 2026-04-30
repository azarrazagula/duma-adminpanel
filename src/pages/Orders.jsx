import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Tag, Box } from 'lucide-react';
import AddProductModal from '../components/dashboard/AddProductModal';
import EditProductModal from '../components/dashboard/EditProductModal';
import DeleteConfirmationModal from '../components/dashboard/DeleteConfirmationModal';
import { deleteProduct } from '../EndpontsLogics/productService';

const Orders = ({ products, filteredProducts, loading, error, refreshProducts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'T-Shirt', 'Jeans'];

  const displayedProducts = filteredProducts.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  const handleEditClick = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
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

  if (loading) return <div className="p-16 text-center text-slate-500 font-medium text-lg">Loading products...</div>;
  if (error) return <div className="p-16 text-center text-red-500 font-medium">{error}</div>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1400px] mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 bg-accent-gradient bg-clip-text text-transparent">Product Cards Hub</h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">Visually manage your inventory and products</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent-gradient text-white px-6 py-3 rounded-xl text-sm md:text-base font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_10px_20px_-5px_rgba(67,24,255,0.4)] w-full sm:w-auto justify-center"
          >
            <Plus size={20} /> Add New Product
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {categories.map((cat, i) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                    ? 'bg-accent-primary text-white shadow-[0_8px_20px_-6px_rgba(67,24,255,0.5)] scale-105 ring-2 ring-accent-primary ring-offset-2 ring-offset-[#f4f7fe]'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                {cat !== 'All' && <Tag size={16} />}
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedProducts.map((product, i) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                className={`group relative bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 border-2 ${product.stock > 0 ? 'border-transparent hover:border-accent-primary/30' : 'border-red-100 hover:border-red-400/50'
                  }`}
              >
                {/* Image Section */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={`http://localhost:5001${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Box size={64} />
                    </div>
                  )}

                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-accent-primary shadow-lg border border-white/50">
                    {product.category}
                  </div>

                  {/* Stock Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-md ${product.stock > 0 ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
                    }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                      onClick={(e) => handleEditClick(e, product)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-primary hover:scale-110 transition-transform shadow-xl"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, product)}
                      className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">ID: {product._id.slice(-6)}</div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-slate-900 font-black text-2xl">
                      <span className="text-accent-primary text-lg">$</span>
                      {product.price.toFixed(2)}
                    </div>
                    <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 font-bold text-sm flex items-center gap-1">
                      Size: {product.size}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {displayedProducts.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
              <Box size={64} className="mb-4 opacity-50" />
              <p className="text-xl font-semibold">No products found in this category.</p>
            </div>
          )}
        </div>
      </motion.div>

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
    </>
  );
};

export default Orders;
