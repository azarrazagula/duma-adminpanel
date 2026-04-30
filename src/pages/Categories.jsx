import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Package, Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { fetchAllProducts } from '../EndpontsLogics/productService';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive categories from actual products
  const categoryData = [...new Set(products.map(p => p.category))].map(cat => {
    const catProducts = products.filter(p => p.category === cat);
    return {
      name: cat,
      count: catProducts.length,
      totalStock: catProducts.reduce((acc, p) => acc + p.stock, 0),
      avgPrice: (catProducts.reduce((acc, p) => acc + p.price, 0) / catProducts.length).toFixed(2),
      image: catProducts[0]?.image || null,
    };
  });

  const categoryColors = {
    'T-Shirt': { bg: 'from-violet-500 to-purple-600', border: 'border-violet-200', light: 'bg-violet-50' },
    'Jeans': { bg: 'from-blue-500 to-indigo-600', border: 'border-blue-200', light: 'bg-blue-50' },
  };

  const getColor = (name) => categoryColors[name] || { bg: 'from-slate-500 to-slate-600', border: 'border-slate-200', light: 'bg-slate-50' };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-primary mb-4" size={48} />
        <p className="text-slate-500 font-bold">Loading categories...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Category Management</h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Organize and monitor your product categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-accent-gradient text-white px-6 py-3 rounded-xl text-sm md:text-base font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_10px_20px_-5px_rgba(67,24,255,0.4)] w-full sm:w-auto justify-center"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-violet-500 rounded-xl text-white"><Tag size={20} /></div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Categories</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">{categoryData.length}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-cyan-500 rounded-xl text-white"><Package size={20} /></div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Products</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">{products.length}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-500 rounded-xl text-white"><Package size={20} /></div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Stock</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">{products.reduce((acc, p) => acc + p.stock, 0)}</div>
        </motion.div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoryData.map((cat, i) => {
          const colors = getColor(cat.name);
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 border-2 ${colors.border} group`}
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${colors.bg} relative overflow-hidden`}>
                <div className="absolute -right-6 -bottom-6 opacity-20 text-white">
                  <Tag size={120} />
                </div>
                <div className="relative z-10 p-6 flex items-center justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{cat.name}</h3>
                    <p className="text-white/80 text-sm font-medium mt-1">{cat.count} products</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20">
                      <Edit2 size={16} />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500/50 transition-all border border-white/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-3 rounded-xl ${colors.light} text-center`}>
                    <div className="text-xl font-extrabold text-slate-900">{cat.count}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Products</div>
                  </div>
                  <div className={`p-3 rounded-xl ${colors.light} text-center`}>
                    <div className="text-xl font-extrabold text-slate-900">{cat.totalStock}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stock</div>
                  </div>
                  <div className={`p-3 rounded-xl ${colors.light} text-center`}>
                    <div className="text-xl font-extrabold text-slate-900">${cat.avgPrice}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Price</div>
                  </div>
                </div>

                {/* Product Thumbnails */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Products:</span>
                  <div className="flex -space-x-2">
                    {products.filter(p => p.category === cat.name).slice(0, 4).map((p) => (
                      <div key={p._id} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                        {p.image ? (
                          <img src={`http://localhost:5001${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px]">📦</div>
                        )}
                      </div>
                    ))}
                    {products.filter(p => p.category === cat.name).length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-accent-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                        +{products.filter(p => p.category === cat.name).length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {categoryData.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
            <Tag size={64} className="mb-4 opacity-50" />
            <p className="text-xl font-semibold">No categories found. Add products first.</p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-[95%] max-w-md bg-white rounded-[24px] p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Add New Category</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <input
              type="text"
              placeholder="Category name (e.g. Hoodies)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 outline-none focus:border-accent-primary transition-all mb-6"
            />
            <button
              onClick={() => { setShowAddModal(false); setNewCategory(''); }}
              className="w-full bg-accent-gradient text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-accent-primary/20"
            >
              Create Category
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Categories;
