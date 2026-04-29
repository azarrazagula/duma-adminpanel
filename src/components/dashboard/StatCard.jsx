import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ label, value, icon, color, delay }) => {
  return (
    <motion.div 
      className="bg-dark-card p-6 rounded-[20px] border border-glass transition-all duration-300 hover:translate-y-[-5px] hover:border-accent-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex justify-between items-center mb-4">
        <div 
          className="p-2.5 rounded-xl" 
          style={{ background: `${color}15`, color }}
        >
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <ArrowUpRight size={18} className="text-slate-secondary" />
      </div>
      <div className="text-[32px] font-bold mb-1 leading-tight">{value}</div>
      <div className="text-slate-secondary text-sm font-medium">{label}</div>
    </motion.div>
  );
};

export default StatCard;
