import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, Ban, Eye, MoreVertical, Loader2, ShieldCheck, X, DollarSign, Trash2 } from 'lucide-react';
import { toggleBlockCustomer, getCustomerDetails, deleteCustomer } from '../EndpontsLogics/customerService';
import { useAdmin } from '../context/AdminContext';
import { CustomersSkeleton } from '../components/ui/Skeleton';

const Customers = () => {
  const { customers, loading, refreshData } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Custom Delete Confirm State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggleBlock = async (id) => {
    try {
      await toggleBlockCustomer(id);
      refreshData();
      setOpenMenuId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;
    try {
      setDeleteLoading(true);
      await deleteCustomer(customerToDelete._id);
      refreshData();
      setShowDeleteConfirm(false);
      setCustomerToDelete(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      setDetailLoading(true);
      setShowDetailModal(true);
      setOpenMenuId(null);
      const data = await getCustomerDetails(id);
      setSelectedCustomer(data);
    } catch (err) {
      alert(err.message);
      setShowDetailModal(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avatarColors = ['bg-violet-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500'];

  if (loading) {
    return <CustomersSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
      onClick={() => setOpenMenuId(null)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Manage your customer base</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 outline-none focus:border-accent-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="relative overflow-hidden p-6 rounded-[24px] text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', boxShadow: '0 10px 20px -5px #8b5cf660' }}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.15]"><Users size={100} /></div>
          <div className="relative z-10">
            <div className="text-4xl font-extrabold">{customers.length}</div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wider mt-1">Total Customers</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative overflow-hidden p-6 rounded-[24px] text-white" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 10px 20px -5px #10b98160' }}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.15]"><Users size={100} /></div>
          <div className="relative z-10">
            <div className="text-4xl font-extrabold">{customers.filter(c => !c.isBlocked).length}</div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wider mt-1">Active Customers</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="relative overflow-hidden p-6 rounded-[24px] text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', boxShadow: '0 10px 20px -5px #06b6d460' }}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.15]"><ShoppingBag size={100} /></div>
          <div className="relative z-10">
            <div className="text-4xl font-extrabold">{customers.filter(c => c.isBlocked).length}</div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wider mt-1">Blocked Customers</div>
          </div>
        </motion.div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{customer.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${!customer.isBlocked ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>{customer.isBlocked ? 'Blocked' : 'Active'}</span>
                </div>
              </div>
              
              {/* 3 Dots Menu */}
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === customer._id ? null : customer._id); }}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-slate-600 transition-all"
                >
                  <MoreVertical size={16} />
                </button>
                <AnimatePresence>
                  {openMenuId === customer._id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => handleViewDetails(customer._id)}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent-primary flex items-center gap-2"
                      >
                        <Eye size={14} /> Order Details
                      </button>
                      <button 
                        onClick={() => handleToggleBlock(customer._id)}
                        className={`w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-2 ${
                          customer.isBlocked ? 'text-emerald-500 hover:bg-emerald-50' : 'text-amber-500 hover:bg-amber-50'
                        }`}
                      >
                        {customer.isBlocked ? <ShieldCheck size={14} /> : <Ban size={14} />}
                        {customer.isBlocked ? 'Unblock User' : 'Block User'}
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(customer)}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete Customer
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500"><Mail size={14} /> {customer.email}</div>
              <div className="flex items-center gap-2 text-slate-500"><Phone size={14} /> {customer.mobile || 'N/A'}</div>
              <div className="flex items-center gap-2 text-slate-500"><MapPin size={14} /> {new Date(customer.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
               <div className="text-xs font-bold text-slate-400">Customer ID: {customer._id.slice(-8).toUpperCase()}</div>
               <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-accent-primary tracking-wider">
                  Details Available <Eye size={12} />
               </div>
            </div>
          </motion.div>
        ))}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={() => !deleteLoading && setShowDeleteConfirm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl text-center overflow-hidden"
              >
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                  <Trash2 size={40} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Are you sure?</h2>
                <p className="text-slate-500 font-medium mb-8">
                  You are about to delete <span className="font-bold text-slate-900">{customerToDelete?.name}'s</span> account. This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    disabled={deleteLoading}
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
                  >
                    No, Keep it
                  </button>
                  <button
                    disabled={deleteLoading}
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {deleteLoading ? <Loader2 className="animate-spin" size={20} /> : 'Yes, Delete'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
            <Users size={64} className="mb-4 opacity-50" />
            <p className="text-xl font-semibold">No customers found.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowDetailModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              {detailLoading ? (
                <div className="py-20 flex flex-col items-center">
                  <Loader2 className="animate-spin text-accent-primary mb-4" size={40} />
                  <p className="text-slate-500 font-bold">Loading details...</p>
                </div>
              ) : selectedCustomer && (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-accent-gradient rounded-[20px] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-accent-primary/20">
                        {selectedCustomer.customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">{selectedCustomer.customer.name}</h2>
                        <p className="text-slate-500 font-medium">{selectedCustomer.customer.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <ShoppingBag className="text-indigo-500" size={20} />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">{selectedCustomer.stats.totalOrders}</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <DollarSign className="text-emerald-500" size={20} />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Spent</span>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">${selectedCustomer.stats.totalSpent.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h3>
                    <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                      {selectedCustomer.stats.orders.length > 0 ? selectedCustomer.stats.orders.map(order => (
                        <div key={order._id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-all">
                          <div>
                            <div className="font-bold text-slate-900">Order #{order._id.slice(-6).toUpperCase()}</div>
                            <div className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-extrabold text-slate-900">${order.totalPrice.toLocaleString()}</div>
                            <div className={`text-[10px] font-bold uppercase ${
                              order.status === 'Delivered' ? 'text-emerald-500' : 'text-amber-500'
                            }`}>{order.status}</div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-center text-slate-400 py-4 text-sm">No orders placed yet.</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Customers;
