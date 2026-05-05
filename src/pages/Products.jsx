import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Tag, Box, Loader2, Camera, X } from 'lucide-react';
import AddProductModal from '../components/dashboard/AddProductModal';
import EditProductModal from '../components/dashboard/EditProductModal';
import DeleteConfirmationModal from '../components/dashboard/DeleteConfirmationModal';
import { deleteProduct } from '../EndpontsLogics/productService';
import { createCategory, deleteCategory, updateCategory } from '../EndpontsLogics/categoryService';
import { IMAGE_BASE_URL } from '../constants/config';

import { useAdmin } from '../context/AdminContext';

const Products = ({ products, filteredProducts, loading, error, refreshProducts }) => {
  const { categories, refreshData } = useAdmin();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category States
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState(null);
  const [catImagePreview, setCatImagePreview] = useState(null);
  const [isCatSubmitting, setIsCatSubmitting] = useState(false);

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

  // Category Logic
  const getColor = (name) => {
    const sets = [
      { bg: 'from-violet-500 to-purple-600', border: 'border-violet-100', light: 'bg-violet-50', text: 'text-violet-600' },
      { bg: 'from-cyan-500 to-blue-600', border: 'border-cyan-100', light: 'bg-cyan-50', text: 'text-cyan-600' },
      { bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-100', light: 'bg-emerald-50', text: 'text-emerald-600' },
      { bg: 'from-amber-500 to-orange-600', border: 'border-amber-100', light: 'bg-amber-50', text: 'text-amber-600' },
      { bg: 'from-rose-500 to-pink-600', border: 'border-rose-100', light: 'bg-rose-50', text: 'text-rose-600' },
    ];
    if (name === 'All') return { bg: 'from-slate-700 to-slate-900', border: 'border-slate-200', light: 'bg-slate-50', text: 'text-slate-600' };
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sets[hash % sets.length];
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setIsCatSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', catName);
      if (catImage) formData.append('image', catImage);

      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
      } else {
        await createCategory(formData);
      }
      setShowCatModal(false);
      setEditingCategory(null);
      setCatName('');
      setCatImage(null);
      setCatImagePreview(null);
      refreshData();
      refreshProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsCatSubmitting(false);
    }
  };

  const handleCatDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        if (selectedCategory === categories.find(c => c._id === id)?.name) {
          setSelectedCategory('All');
        }
        refreshData();
        refreshProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleCatEdit = (e, cat) => {
    e.stopPropagation();
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatImagePreview(cat.image ? `${IMAGE_BASE_URL}${cat.image}` : null);
    setShowCatModal(true);
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900 tracking-tight">Products</h1>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium">Manage and organize your product inventory</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <button
              onClick={() => setShowCatModal(true)}
              className="w-full sm:w-auto bg-white text-slate-600 border-2 border-slate-200 px-4 py-3 sm:px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
            >
              <Tag size={18} /> <span>Add Category</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto bg-accent-gradient text-white px-4 py-3 sm:px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
            >
              <Plus size={20} /> <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Categories as Filters - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mb-10">
            {/* All Category Card */}
            <motion.div
              onClick={() => setSelectedCategory('All')}
              className={`cursor-pointer w-full h-20 sm:h-24 md:h-28 rounded-2xl border-2 transition-all p-3 md:p-4 relative overflow-hidden flex items-center justify-center ${
                selectedCategory === 'All' ? 'border-slate-900 shadow-xl scale-[1.02] sm:scale-105' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
               <div className={`absolute inset-0 bg-gradient-to-r ${getColor('All').bg} opacity-10`} />
               <div className="relative z-10 text-center">
                  <h3 className="font-black text-slate-900 text-sm sm:text-base md:text-lg uppercase tracking-widest">All</h3>
                  <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold mt-0.5">{products.length} Products</p>
               </div>
            </motion.div>

            {categories.map((cat) => {
              const colors = getColor(cat.name);
              const catProducts = products.filter(p => p.category === cat.name);
              const isActive = selectedCategory === cat.name;

              return (
                <motion.div
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`cursor-pointer w-full h-20 sm:h-24 md:h-28 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                    isActive ? `border-slate-900 shadow-xl scale-[1.02] sm:scale-105` : `border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50`
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-[0.08] group-hover:opacity-15 transition-opacity`} />
                  <div className="p-3 md:p-4 relative z-10 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <div className="pr-1 flex-1 overflow-hidden">
                        <h3 className="font-black text-slate-900 text-xs sm:text-sm md:text-base uppercase tracking-tight leading-none truncate">{cat.name}</h3>
                        <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold mt-1 md:mt-1.5">{catProducts.length} Items</p>
                      </div>
                      <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-1">
                        <button onClick={(e) => handleCatEdit(e, cat)} className="p-1 sm:p-1.5 bg-white shadow-sm border border-slate-100 rounded text-slate-400 hover:text-accent-primary hover:border-accent-primary/30 transition-colors">
                          <Edit2 size={10} className="sm:w-3 sm:h-3" />
                        </button>
                        <button onClick={(e) => handleCatDelete(e, cat._id)} className="p-1 sm:p-1.5 bg-white shadow-sm border border-slate-100 rounded text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-colors">
                          <Trash2 size={10} className="sm:w-3 sm:h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center -space-x-1.5 md:-space-x-2">
                      {catProducts.slice(0, 4).map((p, idx) => (
                        <div key={idx} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                          <img 
                            src={p.image?.startsWith('http') ? p.image : `${IMAGE_BASE_URL}${p.image}`} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                      {catProducts.length > 4 && (
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-white ${colors.bg} text-white flex items-center justify-center text-[7px] md:text-[8px] font-bold shadow-sm`}>
                          +{catProducts.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Product Grid Header */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            {selectedCategory} <span className="text-slate-400 ml-1">({displayedProducts.length})</span>
          </h2>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence>
            {displayedProducts.map((product, i) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: i * 0.02 }}
                className={`group relative bg-white rounded-[16px] md:rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${product.stock > 0 ? 'border-slate-100 hover:border-slate-200' : 'border-red-100'
                  }`}
              >
                <div className="relative h-40 md:h-56 w-full bg-slate-50 overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image.startsWith('http') ? product.image : `${IMAGE_BASE_URL}${product.image}`} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200"><Box size={32} className="md:w-12 md:h-12" /></div>
                  )}

                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase text-accent-primary border border-white/50">{product.category}</div>

                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 md:gap-3">
                    <button onClick={(e) => handleEditClick(e, product)} className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-slate-900 hover:scale-110 transition-all shadow-xl"><Edit2 size={16} /></button>
                    <button onClick={(e) => handleDeleteClick(e, product)} className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-lg md:rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all shadow-xl"><Trash2 size={16} /></button>
                  </div>
                </div>

                <div className="p-3 md:p-5">
                  <h3 className="text-sm md:text-base font-black text-slate-900 mb-1 truncate uppercase tracking-tighter">{product.name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0">
                    <div className="text-base md:text-xl font-black text-slate-900"><span className="text-[10px] md:text-xs text-accent-primary mr-0.5">$</span>{product.price}</div>
                    <div className={`text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg w-max ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {product.stock > 0 ? `STOCK: ${product.stock}` : 'SOLD OUT'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modals */}
      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={refreshProducts} />
      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={refreshProducts} product={selectedProduct} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} loading={deleteLoading} />

      {/* Category Modal */}
      <AnimatePresence>
        {showCatModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCatModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <button onClick={() => setShowCatModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
              </div>
              <form onSubmit={handleCatSubmit} className="space-y-6">
                <div className="relative flex justify-center">
                  <input type="file" id="cat-img" hidden onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setCatImage(file);
                      const reader = new FileReader();
                      reader.onloadend = () => setCatImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                  <label htmlFor="cat-img" className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                    {catImagePreview ? <img src={catImagePreview} alt="Preview" className="w-full h-full object-cover" /> : <Camera size={24} className="text-slate-300" />}
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-bold outline-none focus:border-accent-primary"
                />
                <button type="submit" disabled={isCatSubmitting} className="w-full bg-accent-gradient text-white py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-accent-primary/20">
                  {isCatSubmitting ? <Loader2 className="animate-spin mx-auto" /> : (editingCategory ? 'Update' : 'Create')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;
