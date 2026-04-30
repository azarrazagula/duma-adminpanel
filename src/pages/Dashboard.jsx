import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-bold mb-1 md:mb-2">Dashboard</h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Welcome to your admin panel overview</p>
        </div>
      </div>
      
      <div className="p-8 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 rounded-[24px] text-center text-slate-500">
        <p>Dashboard overview metrics will appear here.</p>
        <p className="mt-2 text-sm">Use the sidebar to navigate to Products management.</p>
      </div>
    </motion.div>
  );
};

export default Dashboard;
