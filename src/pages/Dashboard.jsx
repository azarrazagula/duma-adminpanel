import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Loader2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Dashboard = () => {
  const { products, orders, loading } = useAdmin();

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalCustomers = [...new Set(orders.map(o => o.user?._id))].length;
  const todaySales = orders
    .filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
    .reduce((acc, o) => acc + o.totalPrice, 0);

  const statusColors = {
    Delivered: 'bg-emerald-500/10 text-emerald-600',
    Shipped: 'bg-blue-500/10 text-blue-600',
    Pending: 'bg-amber-500/10 text-amber-600',
    Cancelled: 'bg-red-500/10 text-red-600',
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, change: '+12.5%', up: true, icon: <ShoppingCart />, color: '#8b5cf6' },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+8.2%', up: true, icon: <DollarSign />, color: '#06b6d4' },
    { label: 'Total Customers', value: totalCustomers, change: '+5.1%', up: true, icon: <Users />, color: '#10b981' },
    { label: "Today's Sales", value: `$${todaySales.toLocaleString()}`, change: todaySales > 0 ? '+100%' : '0%', up: todaySales > 0, icon: <TrendingUp />, color: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-primary mb-4" size={48} />
        <p className="text-slate-500 font-bold">Loading dashboard data...</p>
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
        <h1 className="text-[24px] md:text-[32px] font-extrabold mb-1 md:mb-2 text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">Welcome back! Here's your business snapshot</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden p-6 rounded-[24px] text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
              boxShadow: `0 10px 20px -5px ${stat.color}60`
            }}
          >
            {/* Watermark Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.15] pointer-events-none">
              {React.cloneElement(stat.icon, { size: 120 })}
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  stat.up ? 'bg-white/20' : 'bg-red-400/30'
                } backdrop-blur-md border border-white/20`}>
                  {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-[36px] font-extrabold tracking-tight drop-shadow-md">{stat.value}</div>
              <div className="text-white/90 text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
            <p className="text-sm text-slate-500 mt-1">Latest transactions from your store</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-indigo-50/50 border-b border-indigo-100">
                  <th className="text-left p-4 pl-6 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left p-4 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left p-4 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left p-4 pr-6 text-indigo-900/60 font-bold text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order, i) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 pl-6 border-b border-slate-100 font-bold text-accent-primary text-sm">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 border-b border-slate-100">
                      <div className="font-semibold text-slate-900 text-sm">{order.user?.name}</div>
                      <div className="text-xs text-slate-400">{order.orderItems[0]?.name} {order.orderItems.length > 1 ? `+${order.orderItems.length - 1} more` : ''}</div>
                    </td>
                    <td className="p-4 border-b border-slate-100 font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                    <td className="p-4 pr-6 border-b border-slate-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Stats Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-6"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Product Overview</h2>
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-500 rounded-xl text-white"><Package size={20} /></div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">{products.length}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Products</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500 rounded-xl text-white"><ShoppingCart size={20} /></div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">{[...new Set(products.map(p => p.category))].length}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Categories</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-500 rounded-xl text-white"><Package size={20} /></div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">{products.filter(p => p.stock === 0).length}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Out of Stock</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 rounded-xl text-white"><Clock size={20} /></div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">{orders.filter(o => o.status === 'Pending').length}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pending Orders</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
