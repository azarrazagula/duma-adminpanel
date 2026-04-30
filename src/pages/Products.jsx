import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, LayoutDashboard, ShoppingCart, Users, Tag } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ProductTable from '../components/dashboard/ProductTable';
const Products = ({ products, filteredProducts, loading, error }) => {

  const stats = [
    { label: 'Total Products', value: products.length, icon: <Package />, color: '#8b5cf6' },
    { label: 'Total Categories', value: [...new Set(products.map(p => p.category))].length, icon: <LayoutDashboard />, color: '#06b6d4' },
    { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, icon: <ShoppingCart />, color: '#ef4444' },
    { label: 'Avg. Price', value: `$${(products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)).toFixed(2)}`, icon: <Users />, color: '#10b981' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'T-Shirt', 'Jeans'];

  const displayedProducts = filteredProducts.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

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
            <h1 className="text-[24px] md:text-[32px] font-bold mb-1 md:mb-2">Inventory Overview</h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">Manage and monitor your product catalog</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>

          {/* Category Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {categories.map((cat, i) => {
              const isActive = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${isActive
                    ? 'bg-accent-gradient text-white shadow-[0_8px_20px_-6px_rgba(67,24,255,0.5)] scale-105'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {cat === 'All' && <LayoutDashboard size={18} />}
                  {cat !== 'All' && <Tag size={18} />}
                  {cat}
                </motion.button>
              );
            })}
          </div>

        <ProductTable
          products={displayedProducts}
          loading={loading}
          error={error}
        />
      </motion.div>

    </>
  );
};

export default Products;
