import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, Ban, Eye, MoreVertical } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customer data
  const customers = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@gmail.com', phone: '+91 98765 43210', location: 'Chennai', orders: 12, spent: 459.88, joined: '2026-01-15', status: 'Active', avatar: 'RK' },
    { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '+91 87654 32109', location: 'Bangalore', orders: 8, spent: 329.92, joined: '2026-02-20', status: 'Active', avatar: 'PS' },
    { id: 3, name: 'Arjun Patel', email: 'arjun@gmail.com', phone: '+91 76543 21098', location: 'Mumbai', orders: 15, spent: 789.85, joined: '2025-11-10', status: 'Active', avatar: 'AP' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@gmail.com', phone: '+91 65432 10987', location: 'Hyderabad', orders: 5, spent: 199.95, joined: '2026-03-05', status: 'Active', avatar: 'SR' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@gmail.com', phone: '+91 54321 09876', location: 'Delhi', orders: 3, spent: 134.97, joined: '2026-04-01', status: 'Blocked', avatar: 'VS' },
    { id: 6, name: 'Ananya Das', email: 'ananya@gmail.com', phone: '+91 43210 98765', location: 'Kolkata', orders: 20, spent: 1249.80, joined: '2025-08-22', status: 'Active', avatar: 'AD' },
    { id: 7, name: 'Karthik Raj', email: 'karthik@gmail.com', phone: '+91 32109 87654', location: 'Chennai', orders: 7, spent: 279.93, joined: '2026-01-30', status: 'Active', avatar: 'KR' },
    { id: 8, name: 'Meera Joshi', email: 'meera@gmail.com', phone: '+91 21098 76543', location: 'Mumbai', orders: 9, spent: 494.91, joined: '2025-12-18', status: 'Active', avatar: 'MJ' },
  ];

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avatarColors = ['bg-violet-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500'];

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
            <div className="text-4xl font-extrabold">{customers.filter(c => c.status === 'Active').length}</div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wider mt-1">Active Customers</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="relative overflow-hidden p-6 rounded-[24px] text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', boxShadow: '0 10px 20px -5px #06b6d460' }}>
          <div className="absolute -right-4 -bottom-4 opacity-[0.15]"><ShoppingBag size={100} /></div>
          <div className="relative z-10">
            <div className="text-4xl font-extrabold">${customers.reduce((a, c) => a + c.spent, 0).toFixed(0)}</div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wider mt-1">Total Revenue</div>
          </div>
        </motion.div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {customer.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{customer.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>{customer.status}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500"><Mail size={14} /> {customer.email}</div>
              <div className="flex items-center gap-2 text-slate-500"><Phone size={14} /> {customer.phone}</div>
              <div className="flex items-center gap-2 text-slate-500"><MapPin size={14} /> {customer.location}</div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-center">
                <div className="text-lg font-extrabold text-slate-900">{customer.orders}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-accent-primary">${customer.spent.toFixed(0)}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Spent</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg hover:bg-accent-primary/20 transition-all">
                  <Eye size={16} />
                </button>
                <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all">
                  <Ban size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
            <Users size={64} className="mb-4 opacity-50" />
            <p className="text-xl font-semibold">No customers found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Customers;
