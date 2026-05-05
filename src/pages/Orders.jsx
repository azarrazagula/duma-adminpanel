import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, Truck, CheckCircle, XCircle, ChevronDown, Package, Loader2 } from 'lucide-react';
import { updateOrderStatus, getPaymentDetails } from '../EndpontsLogics/orderService';
import { CreditCard, Mail, Phone, Calendar, Info } from 'lucide-react';
import { IMAGE_BASE_URL } from '../constants/config';

import { useAdmin } from '../context/AdminContext';

const Orders = () => {
  const { orders, loading, refreshData } = useAdmin();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [fetchingPayment, setFetchingPayment] = useState(false);

  const statusFilters = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      refreshData(); // Refresh orders after update via context
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleViewPayment = async (order) => {
    setPaymentData({ 
      id: order.razorpayPaymentId || 'pay_SkPs2fD4HGEjIC', 
      amount: order.totalPrice * 100, // INR to Paise
      status: 'Loading...', 
      method: '...' 
    });
    setPaymentModalOpen(true);
    setFetchingPayment(true);
    
    try {
      const data = await getPaymentDetails(order.razorpayPaymentId || 'pay_SkPs2fD4HGEjIC');
      setPaymentData(data);
    } catch (err) {
      console.error('Failed to fetch payment details:', err);
    } finally {
      setFetchingPayment(false);
    }
  };

  const filteredOrders = selectedStatus === 'All' ? orders : orders.filter(o => o.status === selectedStatus);

  const statusConfig = {
    Pending: { color: 'bg-amber-500/10 text-amber-600 border-amber-200', icon: <Clock size={16} />, gradient: 'from-amber-400 to-orange-500' },
    Shipped: { color: 'bg-blue-500/10 text-blue-600 border-blue-200', icon: <Truck size={16} />, gradient: 'from-blue-400 to-indigo-500' },
    Delivered: { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', icon: <CheckCircle size={16} />, gradient: 'from-emerald-400 to-green-500' },
    Cancelled: { color: 'bg-red-500/10 text-red-600 border-red-200', icon: <XCircle size={16} />, gradient: 'from-red-400 to-rose-500' },
  };

  const statusCounts = {
    All: orders.length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
    Cancelled: orders.filter(o => o.status === 'Cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-primary mb-4" size={48} />
        <p className="text-slate-500 font-bold">Loading orders...</p>
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
      <div className="mb-8">
        <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Order Management</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">Track and manage all customer orders from your store</p>
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statusFilters.map((status, i) => {
          const isActive = selectedStatus === status;
          return (
            <motion.button
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedStatus(status)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                isActive
                  ? 'bg-accent-gradient text-white shadow-[0_10px_20px_-5px_rgba(67,24,255,0.4)] scale-105 ring-2 ring-accent-primary ring-offset-2 ring-offset-[#f4f7fe]'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className={`text-3xl font-extrabold ${isActive ? 'text-white' : 'text-slate-900'}`}>{statusCounts[status]}</div>
              <div className={`text-sm font-bold mt-1 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>{status}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, i) => {
          const config = statusConfig[order.status] || statusConfig.Pending;
          const isExpanded = expandedOrder === order._id;
          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Order Row */}
              <div
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-lg`}>
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-accent-primary">#{order._id.slice(-6).toUpperCase()}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${config.color}`}>
                        {config.icon} {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{order.user?.name || 'Guest'} • {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-slate-900">${order.totalPrice.toFixed(2)}</div>
                    <div className="text-xs text-slate-400 font-semibold">{order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}</div>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-slate-100 p-5 bg-slate-50/50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Customer</div>
                      <div className="font-semibold text-slate-900">{order.user?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                      <div className="font-semibold text-slate-900">{order.user?.email}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Method</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
                        {order.paymentMethod === 'Razorpay' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleViewPayment(order); }}
                            className="text-accent-primary hover:text-accent-secondary flex items-center gap-1 text-xs font-bold transition-colors"
                          >
                            <Info size={14} /> View Details
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</div>
                      <div className="font-semibold text-slate-900">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 mb-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</div>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                          {item.image ? (
                            <img src={`${IMAGE_BASE_URL}${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400"><Package size={20} /></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                          <div className="text-xs text-slate-500">Qty: {item.qty}</div>
                        </div>
                        <div className="font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status Update Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Update Status:</span>
                    {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                      <button
                        key={s}
                        onClick={(e) => { e.stopPropagation(); handleStatusChange(order._id, s); }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          order.status === s
                            ? `bg-gradient-to-r ${statusConfig[s].gradient} text-white shadow-md`
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {statusConfig[s].icon} {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <ShoppingCart size={64} className="mb-4 opacity-50" />
            <p className="text-xl font-semibold">No orders found with this status.</p>
          </div>
        )}
      {/* Payment Details Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setPaymentModalOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 bg-accent-gradient text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold flex items-center gap-2">
                  <CreditCard size={24} /> Payment Details
                </h3>
                <p className="text-white/80 text-sm font-medium mt-1">Transaction information from Razorpay</p>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {paymentData ? (
                <div className="space-y-6">
                  {/* Status & Amount Banner */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between relative overflow-hidden">
                    {fetchingPayment && (
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1 bg-accent-primary/20"
                      />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
                      <div className={`flex items-center gap-1.5 font-extrabold ${
                        paymentData.status === 'captured' ? 'text-emerald-600' : 
                        paymentData.status === 'Loading...' ? 'text-slate-400' : 'text-amber-600'
                      }`}>
                        {paymentData.status === 'captured' ? <CheckCircle size={18} /> : <Clock size={18} />}
                        {paymentData.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Amount Paid</div>
                      <div className="text-2xl font-black text-slate-900">₹{(paymentData.amount / 100).toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Payment Details Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        <Info size={14} /> Payment ID
                      </div>
                      <div className="font-bold text-slate-900 break-all bg-slate-50 p-2 rounded-lg border border-slate-100 text-sm">
                        {paymentData.id}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        <CreditCard size={14} /> Method
                      </div>
                      <div className="font-bold text-slate-900 capitalize flex items-center gap-2">
                        {fetchingPayment ? (
                          <div className="w-20 h-4 bg-slate-100 animate-pulse rounded" />
                        ) : (
                          <>
                            {paymentData.method === 'card' && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px]">{paymentData.card?.network}</span>}
                            {paymentData.method}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Details</div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <Mail size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Email</div>
                          {fetchingPayment ? (
                            <div className="w-full h-4 bg-slate-100 animate-pulse rounded mt-1" />
                          ) : (
                            <div className="font-bold text-slate-900 text-sm">{paymentData.email || '...'}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <Phone size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Contact</div>
                          {fetchingPayment ? (
                            <div className="w-24 h-4 bg-slate-100 animate-pulse rounded mt-1" />
                          ) : (
                            <div className="font-bold text-slate-900 text-sm">{paymentData.contact || '...'}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {fetchingPayment ? (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 border-dashed flex flex-col items-center justify-center">
                       <Loader2 className="animate-spin text-slate-300 mb-2" size={24} />
                       <span className="text-xs font-bold text-slate-400">Loading Secure Details...</span>
                    </div>
                  ) : paymentData.card && (
                    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-[2px]">Card Details</div>
                        <CreditCard size={24} className="text-white/20" />
                      </div>
                      <div className="text-xl font-medium tracking-[4px] mb-4">
                        **** **** **** {paymentData.card.last4}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[8px] font-bold text-white/40 uppercase mb-1">Network</div>
                          <div className="font-bold text-sm">{paymentData.card.network}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[8px] font-bold text-white/40 uppercase mb-1">Type</div>
                          <div className="font-bold text-sm capitalize">{paymentData.card.type}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!fetchingPayment && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar size={14} />
                      Paid on {new Date((paymentData.created_at || Date.now() / 1000) * 1000).toLocaleString()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">No data available</div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-100 transition-all shadow-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  </motion.div>
  );
};

export default Orders;
