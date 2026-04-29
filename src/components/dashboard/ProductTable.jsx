import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, ExternalLink, Trash2 } from 'lucide-react';

const ProductTable = ({ products, loading, error, onEdit, onDelete }) => {
  if (loading) return <div className="p-16 text-center text-slate-secondary">Loading products...</div>;
  if (error) return <div className="p-16 text-center text-red-500">{error}</div>;
  if (products.length === 0) return <div className="p-16 text-center text-slate-secondary">No products found.</div>;

  return (
    <div className="bg-dark-card rounded-[20px] border border-glass overflow-hidden mt-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white/[0.03]">
            <th className="text-left p-4 pl-6 text-slate-secondary font-medium text-sm border-b border-glass">Product</th>
            <th className="text-left p-4 text-slate-secondary font-medium text-sm border-b border-glass">Category</th>
            <th className="text-left p-4 text-slate-secondary font-medium text-sm border-b border-glass">Price</th>
            <th className="text-left p-4 text-slate-secondary font-medium text-sm border-b border-glass">Stock</th>
            <th className="text-left p-4 text-slate-secondary font-medium text-sm border-b border-glass">Status</th>
            <th className="text-left p-4 pr-6 text-slate-secondary font-medium text-sm border-b border-glass">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {products.map((product, i) => (
              <motion.tr
                key={product._id}
                className="hover:bg-white/[0.01] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <td className="p-4 pl-6 border-b border-glass">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-glass">
                      {product.image ? (
                        <img
                          src={`http://localhost:5001${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">📦</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-primary">{product.name}</div>
                      <div className="text-[10px] text-slate-secondary uppercase tracking-wider">ID: {product._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-glass">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-secondary/10 text-accent-secondary">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 border-b border-glass">
                  <span className="font-bold text-slate-primary">${product.price.toFixed(2)}</span>
                </td>
                <td className="p-4 border-b border-glass text-slate-secondary font-medium">{product.stock}</td>
                <td className="p-4 border-b border-glass">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock > 0
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                    }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 pr-6 border-b border-glass">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg text-slate-secondary hover:bg-white/10 hover:text-slate-primary transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg text-slate-secondary hover:bg-white/10 hover:text-slate-primary transition-all">
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 rounded-lg text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
