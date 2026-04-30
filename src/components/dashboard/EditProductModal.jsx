import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, DollarSign, Tag, FileText, BarChart2, Upload } from 'lucide-react';
import { updateProduct } from '../../EndpontsLogics/productService';

const EditProductModal = ({ isOpen, onClose, onSuccess, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    size: 'M',
    description: '',
    stock: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        size: product.size || 'M',
        description: product.description || '',
        stock: product.stock || ''
      });
      // Set initial preview to the current product image if it exists
      if (product.image) {
        setImagePreview(`http://localhost:5001${product.image}`);
      } else {
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('size', formData.size);
      data.append('description', formData.description);
      data.append('stock', formData.stock);
      if (imageFile) {
        data.append('image', imageFile);
      }

      await updateProduct(product._id, data);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-[95%] max-w-lg bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Edit Product</h2>
                <p className="text-slate-500 text-sm">Update product details and image</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-all">
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Area */}
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="edit-image-upload"
                />
                <label
                  htmlFor="edit-image-upload"
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${imagePreview ? 'border-accent-primary bg-accent-primary/5' : 'border-slate-200 hover:border-accent-primary hover:bg-slate-100'
                    }`}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500 group-hover:text-accent-primary transition-colors">
                      <Upload size={32} className="mb-2" />
                      <span className="text-sm font-medium">Click to change product image</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      required
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <BarChart2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="number"
                      placeholder="Stock"
                      required
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <select
                    required
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Jeans">Jeans</option>
                  </select>
                </div>

                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <select
                    required
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all appearance-none"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  >
                    <option value="" disabled>Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>

                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-500" size={18} />
                  <textarea
                    placeholder="Description"
                    required
                    rows="3"
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-gradient text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-primary/20"
              >
                {loading ? 'Updating Product...' : 'Update Product'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;
