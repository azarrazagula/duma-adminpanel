import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading }) => {
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
            className="relative z-10 w-[95%] max-w-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Product?</h2>
              <p className="text-slate-500 mb-8">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold border border-slate-200 text-slate-900 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>

            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-all">
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
