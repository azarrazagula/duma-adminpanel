import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const ProductTable = ({ products, loading, error, onEdit, onDelete }) => {
  if (loading) return <div className="p-16 text-center text-slate-500">Loading products...</div>;
  if (error) return <div className="p-16 text-center text-red-500">{error}</div>;
  if (products.length === 0) return <div className="p-16 text-center text-slate-500">No products found.</div>;

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[20px] border border-slate-200 overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-indigo-50/50 border-b border-indigo-100">
              <th className="text-left p-4 pl-6 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Product</th>
              <th className="text-left p-4 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Price</th>
              <th className="text-left p-4 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Stock</th>
              <th className="text-left p-4 pr-6 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((product, i) => (
                <motion.tr
                  key={product._id}
                  className="hover:bg-slate-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <td className="p-4 pl-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        {product.image ? (
                          <img
                            src={`http://${window.location.hostname}:5001${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">ID: {product._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-secondary/10 text-accent-secondary">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="p-4 border-b border-slate-200 text-slate-500 font-medium">{product.stock}</td>
                  <td className="p-4 pr-6 border-b border-slate-200">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock > 0
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                      }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
